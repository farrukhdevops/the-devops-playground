# Runbook — Local Operations

## Start
docker compose -p tdp -f platform/compose/compose.yml -f platform/compose/local.override.yml up -d --remove-orphans

## Stop
docker compose -p tdp -f platform/compose/compose.yml -f platform/compose/local.override.yml down

## Rebuild apps
docker compose -p tdp -f platform/compose/compose.yml -f platform/compose/local.override.yml build --no-cache

## Health checks
curl -I http://localhost:3000/
curl -s http://localhost:9090/-/ready
curl -s http://localhost:3100/ready
curl -u admin:devopsplayground -s http://localhost:3001/api/health
curl -s http://localhost:7001/metrics | head -n 2
curl -s http://localhost:7002/metrics | head -n 2
curl -s http://localhost:7003/metrics | head -n 2

## Common fixes
- Grafana dashboards missing: ensure a single provider and JSON under Observability/.
- Promtail logs not flowing: promtail-config.yml must be a FILE; mount to /etc/promtail.yml.
- Prometheus targets missing: check platform/observability/prometheus.yml scrape_configs and service DNS names.
