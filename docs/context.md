# Context — Post-Salvage Canonical State

## What we did today
- Quarantined all legacy files under platform/compose/archive/<timestamp>.
- Rewrote a single compose pair with fixed container names and clean healthchecks.
- Enforced one Grafana provider with dashboards under Observability/.
- Fixed Promtail and Prometheus mounts.
- Normalized ports and volumes; removed tdp-* duplicates.

## Final services
Core: pg, rabbitmq
Observability: loki, promtail, prometheus, grafana, node-exporter, cadvisor
Apps: catalog-api, orders-api, payments-api, inventory-worker, storefront
Ops: portainer

## Ports
storefront 3000
prometheus 9090
loki 3100
grafana 3001
catalog 7001
orders 7002
payments 7003
portainer 9000

## Compose command
docker compose -p tdp -f platform/compose/compose.yml -f platform/compose/local.override.yml up -d --remove-orphans

## Observability truth
- Grafana provider: observability/grafana/provisioning/dashboards/dashboards.yml
- Dashboards folder: Observability
- Datasources: Prometheus (default, http://prometheus:9090), Loki (http://loki:3100)
- Prometheus config: platform/observability/prometheus.yml
- Promtail config: platform/observability/promtail-config.yml (mounted as /etc/promtail.yml)
- Loki single-node with replication_factor: 1 and auth_disabled

## Volumes
pg-data, prom-data, loki-data, grafana-data, portainer-data

## Acceptance
- docker ps shows all services
- Storefront 200 OK on :3000
- Prometheus /-/ready 200
- Loki /ready 200
- Grafana /api/health 200
- APIs expose /metrics on 7001..7003

## Next
- GitHub cleanup complete; continue CI and screenshots for README.
