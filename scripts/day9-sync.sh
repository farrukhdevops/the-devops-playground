#!/usr/bin/env zsh
set -euo pipefail

cd "$(git rev-parse --show-toplevel 2>/dev/null || pwd)"

BASE="platform/compose"
ENV_FILE="$BASE/.env.local"
OBS_DIR="platform/observability"
PROM_FILE="$OBS_DIR/prometheus.yml"
OBS_ADDON="$BASE/observability.addon.yml"
COMPOSE="$BASE/compose.yml"

echo "[1/7] Render merged compose to detect service names"
docker compose -p tdp -f "$COMPOSE" --env-file "$ENV_FILE" config > /tmp/tdp.compose.merged.yml

echo "[2/7] Detect DB and MQ services via yq"
DB_SERVICE=$(
  yq -r '
    .services
    | to_entries[]
    | select(((.value.image // "") | test("(?i)postgres")) or (.key | test("^(pg|postgres|db)$")))
    | .key' /tmp/tdp.compose.merged.yml | head -n1
)
RABBIT_SERVICE=$(
  yq -r '
    .services
    | to_entries[]
    | select(((.value.image // "") | test("(?i)rabbitmq")) or (.key | test("^(rabbitmq|mq|rmq)$")))
    | .key' /tmp/tdp.compose.merged.yml | head -n1
)

# Fallback to names visible in your docker ps snapshot if empty
[[ -n "$DB_SERVICE" ]] || DB_SERVICE="postgres"
[[ -n "$RABBIT_SERVICE" ]] || RABBIT_SERVICE="rabbitmq"
echo "Detected: DB_SERVICE=$DB_SERVICE  RABBIT_SERVICE=$RABBIT_SERVICE"

echo "[3/7] Ensure env exists, dedup, and align to detected hosts"
mkdir -p "$BASE"
touch "$ENV_FILE"
tac "$ENV_FILE" | awk -F= '!seen[$1]++' | tac > /tmp/.env.clean && mv /tmp/.env.clean "$ENV_FILE"

grep -q '^DATABASE_URL=' "$ENV_FILE" || echo "DATABASE_URL=postgresql://postgres:postgres@${DB_SERVICE}:5432/postgres" >> "$ENV_FILE"
grep -q '^RABBITMQ_URL=' "$ENV_FILE" || echo "RABBITMQ_URL=amqp://guest:guest@${RABBIT_SERVICE}:5672/" >> "$ENV_FILE"
sed -i -E "s/@(pg|postgres|db):5432/@${DB_SERVICE}:5432/g" "$ENV_FILE"
sed -i -E "s/@(rabbitmq|mq|rmq):5672/@${RABBIT_SERVICE}:5672/g" "$ENV_FILE"
echo "ENV -> $(grep -E '^(DATABASE_URL|RABBITMQ_URL)=' "$ENV_FILE")"

echo "[4/7] Add missing Day-8 services to compose (idempotent)"
add_svc () {
  local name="$1" portmap="$2" loki="$3" ctx="../../apps/$1"
  # if present, skip
  yq -e '.services["'"$name"'"]' "$COMPOSE" >/dev/null 2>&1 && { echo "  - $name already present"; return 0; }
  if [[ -n "$portmap" ]]; then
    yq -i '
      .services["'"$name"'"] = {
        "build": "'"$ctx"'",
        "container_name": "'"$name"'",
        "depends_on": ["'"$DB_SERVICE"'","'"$RABBIT_SERVICE"'"],
        "env_file": [".env.local"],
        "environment": [
          "DATABASE_URL=${DATABASE_URL}",
          "RABBITMQ_URL=${RABBITMQ_URL}"
        ],
        "ports": ["'"$portmap"'"],
        "labels": {"logging":"promtail","loki_job":"'"$loki"'"}
      }' "$COMPOSE"
  else
    yq -i '
      .services["'"$name"'"] = {
        "build": "'"$ctx"'",
        "container_name": "'"$name"'",
        "depends_on": ["'"$DB_SERVICE"'","'"$RABBIT_SERVICE"'"],
        "env_file": [".env.local"],
        "environment": [
          "DATABASE_URL=${DATABASE_URL}",
          "RABBITMQ_URL=${RABBITMQ_URL}"
        ],
        "labels": {"logging":"promtail","loki_job":"'"$loki"'"}
      }' "$COMPOSE"
  fi
  echo "  - $name added"
}

add_svc orders-api   "8001:8000" "orders-api"
add_svc payments-api "8002:8000" "payments-api"
add_svc ai-worker            ""   "ai-worker"

echo "[5/7] Start only Day-8 services"
docker compose -p tdp -f "$COMPOSE" --env-file "$ENV_FILE" up -d --build orders-api payments-api ai-worker

echo "[6/7] Ensure Prometheus mounts the right config and includes jobs"
mkdir -p "$OBS_DIR"
# create override if missing
if [[ ! -f "$OBS_ADDON" ]]; then
  cat > "$OBS_ADDON" <<'YML'
services:
  prometheus:
    volumes:
      - ../observability/prometheus.yml:/etc/prometheus/prometheus.yml:ro
YML
fi

# create minimal prom file if missing
if [[ ! -f "$PROM_FILE" || -d "$PROM_FILE" ]]; then
  rm -rf "$PROM_FILE"
  cat > "$PROM_FILE" <<'YML'
global:
  scrape_interval: 15s
scrape_configs:
  - job_name: prometheus
    static_configs: [{ targets: ['prometheus:9090'] }]
  - job_name: loki
    static_configs: [{ targets: ['loki:3100'] }]
  - job_name: rabbitmq
    static_configs: [{ targets: ['rabbitmq:15692'] }]
YML
fi

# ensure list exists
yq -i '.scrape_configs = (.scrape_configs // [])' "$PROM_FILE"
# orders-api job
yq -i '
  .scrape_configs |= (map(select(.job_name != "orders-api")) + [
    {"job_name":"orders-api","static_configs":[{"targets":["orders-api:8000"],"labels":{"env":"local"}}]}
  ])' "$PROM_FILE"
# payments-api job
yq -i '
  .scrape_configs |= (map(select(.job_name != "payments-api")) + [
    {"job_name":"payments-api","static_configs":[{"targets":["payments-api:8000"],"labels":{"env":"local"}}]}
  ])' "$PROM_FILE"

echo "[7/7] Recreate Prometheus, wait until ready, print targets"
docker compose -p tdp -f "$COMPOSE" -f "$OBS_ADDON" --env-file "$ENV_FILE" up -d --no-deps --force-recreate prometheus

# readiness loop avoids curl race
until curl -fsS http://localhost:9090/-/ready >/dev/null 2>&1; do sleep 1; done

curl -fsS "http://localhost:9090/api/v1/targets" \
| jq -r '.data.activeTargets[] | "\(.labels.job)\t\(.labels.instance)\t\(.health)"' | sort
