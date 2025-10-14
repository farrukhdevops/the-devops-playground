# The DevOps Playground

This is the **post-salvage canonical baseline**. It replaces all previous history and defines the one true way to run the stack locally.

## One command to run everything

<details>
<summary>Click to expand</summary>

    docker compose -p tdp \
      -f platform/compose/compose.yml \
      -f platform/compose/local.override.yml \
      up -d --remove-orphans

</details>

> **First time?** Copy and edit your local env file:
>
>     cp platform/compose/.env.example platform/compose/.env

## Health URLs
- **Storefront:** [http://localhost:3000](http://localhost:3000)
- **Prometheus:** [http://localhost:9090/-/ready](http://localhost:9090/-/ready)
- **Loki:** [http://localhost:3100/ready](http://localhost:3100/ready)
- **Grafana:** [http://localhost:3001/api/health](http://localhost:3001/api/health)
- **Portainer:** [http://localhost:9000](http://localhost:9000)

## Project structure (canonical)

<details>
<summary>Expand tree</summary>

    .
    ├── README.md
    ├── docs/
    │   ├── INDEX.md
    │   ├── context.md
    │   ├── runbook.md
    │   ├── today-salvage.md
    │   └── CHANGELOG.md
    ├── platform/
    │   ├── compose/
    │   │   ├── compose.yml
    │   │   ├── local.override.yml
    │   │   └── .env.example
    │   └── observability/
    │       ├── prometheus.yml
    │       ├── alert.rules.yml
    │       └── loki/config.yml
    └── observability/
        └── grafana/
            └── provisioning/
                ├── datasources/datasources.yml
                └── dashboards/
                    ├── dashboards.yml
                    └── Observability/
                        ├── TDP — Overview.json
                        ├── TDP — Containers.json
                        ├── TDP — Logs (Loki).json
                        └── Node — Essentials.json

</details>

## Environment & Secrets
- Never commit secrets — use `.env` locally.
- Example file: `platform/compose/.env.example`
- Compose reads `${VAR}` values from `env_file`.

## Workflow
- `dev` = integration branch  
- `main` = release branch  
- PR `dev → main` using **squash merge**  
- After release, reset `dev` to match `main`

## Acceptance checklist
- All containers healthy (`docker ps`)
- Storefront → 200 on port 3000
- Prometheus `/-/ready` → 200
- Loki `/ready` → 200
- Grafana `/api/health` → 200

## Baseline
- Tag: **v1.0.0**
- Date: see `docs/today-salvage.md`
