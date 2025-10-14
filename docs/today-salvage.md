# Today — Salvage Milestone (Narrative)

## Why we did this
The repo and local stack had drift: duplicate containers (tdp-*), broken mounts (promtail file vs dir), multiple Grafana providers, and malformed Compose healthchecks. We chose salvage-in-place and declared a single source of truth.

## Non-negotiables
- One canonical Docker Compose stack (compose.yml + local.override.yml).
- Zero drift in observability: exactly one Grafana dashboards provider and one “Observability” folder.
- Minimal infra (Prometheus, Loki, Promtail, Grafana, Node Exporter, cAdvisor).
- Keep microservices (catalog-api, orders-api, payments-api, inventory-worker) + single frontend (storefront).
- Add Portainer for local ops. Quarantine everything else.

## What changed today
1) Quarantine & cleanup
   - Moved non-canonical compose/provisioning/legacy files to platform/compose/archive/<timestamp>.
   - Ensured no mounts point into archive/.
2) Compose rebuilt cleanly
   - platform/compose/compose.yml with fixed container_name for every service.
   - platform/compose/local.override.yml with host ports only.
   - Healthchecks rewritten as clean YAML arrays.
3) Observability truth
   - Single dashboards provider at observability/grafana/provisioning/dashboards/dashboards.yml.
   - Dashboards only in …/dashboards/Observability/.
   - Datasources: Prometheus (default http://prometheus:9090), Loki (http://loki:3100).
   - Prometheus config/rules in platform/observability/.
   - Promtail config is a FILE platform/observability/promtail-config.yml mounted to /etc/promtail.yml.
4) Loki single-node
   - auth_enabled: false and replication factor 1.
5) Ports and names normalized
   - Storefront 3000; Prometheus 9090; Loki 3100; Grafana 3001; APIs 7001–7003; Portainer 9000.
   - Removed duplicate “tdp-*” containers and legacy names.
6) Docs refreshed
   - Root README.md with architecture, ports, one-command run, health URLs.
   - docs/context.md canonical state; docs/runbook.md operations and fixes.
   - This file records today’s what/why/how.

## Final state (essentials)
Services: pg, rabbitmq, loki, promtail, prometheus, grafana, node-exporter, cadvisor, catalog-api, orders-api, payments-api, inventory-worker, storefront, portainer.
Ports: 3000, 3001, 3100, 7001, 7002, 7003, 9000, 9090.
Run command:
docker compose -p tdp -f platform/compose/compose.yml -f platform/compose/local.override.yml up -d --remove-orphans

## GitHub policy forward
- dev = integration; main = release.
- PR dev → main (squash).
- Immediately realign dev to main after each release.
- No extra compose files. No second Grafana provider tree.

## Proof (screenshots to add)
Place in docs/screenshots/: Prometheus Targets, Grafana “Observability”, Portainer list.


_Last verified: 2025-10-14 20:15 UTC_
