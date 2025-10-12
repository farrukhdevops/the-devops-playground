```text
Project: the-devops-playground
├─ ./
├─ app/
│  ├─ api/
│  │  ├─ bff/
│  │  ├─ local/
│  ├─ cart/
│  ├─ catalog/
│  │  ├─ page.tsx
│  │  ├─ products/
│  ├─ page.tsx
├─ apps/
│  ├─ ai-worker/
│  │  ├─ Dockerfile
│  │  ├─ requirements.txt
│  │  ├─ worker.py
│  ├─ catalog-api/
│  │  ├─ alembic.ini
│  │  ├─ db.py
│  │  ├─ db.py.bak
│  │  ├─ Dockerfile
│  │  ├─ .env
│  │  ├─ __init__.py
│  │  ├─ main.py
│  │  ├─ main.py.bak
│  │  ├─ main.py.bak.1759655805
│  │  ├─ main.py.bak.1759655853
│  │  ├─ main.py.bak.1759656695
│  │  ├─ main.py.bak.1759656984
│  │  ├─ main.py.bak.1759657039
│  │  ├─ main.py.bak.1759662487
│  │  ├─ messaging.py
│  │  ├─ migrations/
│  │  ├─ models.py
│  │  ├─ models.py.bak
│  │  ├─ __pycache__/
│  │  ├─ requirements.txt
│  │  ├─ schemas.py
│  │  ├─ schemas.py.bak
│  │  ├─ wait-for-db.sh
│  │  ├─ wait-for-db.sh.bak
│  ├─ frontend/
│  │  ├─ Dockerfile
│  │  ├─ nginx/
│  │  ├─ public/
│  ├─ inventory-worker/
│  │  ├─ Dockerfile
│  │  ├─ requirements.txt
│  │  ├─ worker.py
│  ├─ orders-api/
│  │  ├─ Dockerfile
│  │  ├─ main.py
│  │  ├─ __pycache__/
│  │  ├─ requirements.txt
│  ├─ payments-api/
│  │  ├─ Dockerfile
│  │  ├─ main.py
│  │  ├─ __pycache__/
│  │  ├─ requirements.txt
│  ├─ storefront/
│  │  ├─ app/
│  │  ├─ components/
│  │  ├─ Dockerfile
│  │  ├─ .dockerignore
│  │  ├─ .env.local
│  │  ├─ .eslintignore
│  │  ├─ .eslintrc.json
│  │  ├─ .eslintrc.json.bak
│  │  ├─ .gitignore
│  │  ├─ lib/
│  │  ├─ .next/
│  │  ├─ next.config.mjs
│  │  ├─ next-env.d.ts
│  │  ├─ package.json
│  │  ├─ package.json.bak
│  │  ├─ package-lock.json
│  │  ├─ postcss.config.mjs
│  │  ├─ .prettierrc
│  │  ├─ public/
│  │  ├─ README.md
│  │  ├─ src/
│  │  ├─ tailwind.config.ts
│  │  ├─ tsconfig.json
│  │  ├─ tsconfig.json.bak
├─ .daylog/
│  ├─ 2025-10-10_01-06-48.txt
│  ├─ day-20251009-214059-compose.yml
│  ├─ day-20251009-214059-env.local
│  ├─ day-20251009-214059-prometheus.yml
│  ├─ day-20251009-232445-compose.yml
│  ├─ day-20251009-232445-env.local
│  ├─ day-20251009-235252-compose.yml
├─ docs/
│  ├─ day101-compose-run.txt
├─ .env.example
├─ .env.local
│  ├─ branches/
│  ├─ COMMIT_EDITMSG
│  ├─ config
│  ├─ description
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ hooks/
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ push-to-checkout.sample
│  │  ├─ sendemail-validate.sample
│  │  ├─ update.sample
├─ .github/
│  ├─ workflows/
│  │  ├─ ci.yml
├─ .gitignore
│  ├─ index
│  ├─ info/
│  │  ├─ exclude
│  ├─ logs/
│  │  ├─ HEAD
│  │  ├─ refs/
│  ├─ objects/
│  │  ├─ 00/
│  │  ├─ 01/
│  │  ├─ 06/
│  │  ├─ 07/
│  │  ├─ 09/
│  │  ├─ 0b/
│  │  ├─ 0d/
│  │  ├─ 11/
│  │  ├─ 12/
│  │  ├─ 13/
│  │  ├─ 14/
│  │  ├─ 19/
│  │  ├─ 1a/
│  │  ├─ 1b/
│  │  ├─ 1d/
│  │  ├─ 1e/
│  │  ├─ 1f/
│  │  ├─ 20/
│  │  ├─ 21/
│  │  ├─ 23/
│  │  ├─ 24/
│  │  ├─ 25/
│  │  ├─ 26/
│  │  ├─ 27/
│  │  ├─ 2a/
│  │  ├─ 2b/
│  │  ├─ 2c/
│  │  ├─ 2f/
│  │  ├─ 31/
│  │  ├─ 32/
│  │  ├─ 33/
│  │  ├─ 34/
│  │  ├─ 35/
│  │  ├─ 37/
│  │  ├─ 38/
│  │  ├─ 39/
│  │  ├─ 3a/
│  │  ├─ 3b/
│  │  ├─ 3c/
│  │  ├─ 3e/
│  │  ├─ 3f/
│  │  ├─ 42/
│  │  ├─ 43/
│  │  ├─ 44/
│  │  ├─ 45/
│  │  ├─ 46/
│  │  ├─ 47/
│  │  ├─ 48/
│  │  ├─ 49/
│  │  ├─ 4a/
│  │  ├─ 4b/
│  │  ├─ 4c/
│  │  ├─ 4d/
│  │  ├─ 4e/
│  │  ├─ 50/
│  │  ├─ 52/
│  │  ├─ 53/
│  │  ├─ 54/
│  │  ├─ 55/
│  │  ├─ 57/
│  │  ├─ 5a/
│  │  ├─ 5b/
│  │  ├─ 5c/
│  │  ├─ 5d/
│  │  ├─ 5e/
│  │  ├─ 5f/
│  │  ├─ 61/
│  │  ├─ 62/
│  │  ├─ 63/
│  │  ├─ 66/
│  │  ├─ 67/
│  │  ├─ 68/
│  │  ├─ 69/
│  │  ├─ 6c/
│  │  ├─ 6d/
│  │  ├─ 6f/
│  │  ├─ 70/
│  │  ├─ 71/
│  │  ├─ 73/
│  │  ├─ 74/
│  │  ├─ 75/
│  │  ├─ 76/
│  │  ├─ 78/
│  │  ├─ 79/
│  │  ├─ 7b/
│  │  ├─ 7c/
│  │  ├─ 7d/
│  │  ├─ 7e/
│  │  ├─ 7f/
│  │  ├─ 80/
│  │  ├─ 81/
│  │  ├─ 82/
│  │  ├─ 83/
│  │  ├─ 85/
│  │  ├─ 86/
│  │  ├─ 87/
│  │  ├─ 88/
│  │  ├─ 89/
│  │  ├─ 8a/
│  │  ├─ 8b/
│  │  ├─ 91/
│  │  ├─ 92/
│  │  ├─ 93/
│  │  ├─ 95/
│  │  ├─ 97/
│  │  ├─ 98/
│  │  ├─ 99/
│  │  ├─ 9b/
│  │  ├─ 9c/
│  │  ├─ 9e/
│  │  ├─ 9f/
│  │  ├─ a0/
│  │  ├─ a1/
│  │  ├─ a2/
│  │  ├─ a3/
│  │  ├─ a5/
│  │  ├─ a6/
│  │  ├─ a7/
│  │  ├─ a9/
│  │  ├─ aa/
│  │  ├─ ab/
│  │  ├─ ac/
│  │  ├─ ae/
│  │  ├─ af/
│  │  ├─ b0/
│  │  ├─ b1/
│  │  ├─ b5/
│  │  ├─ b6/
│  │  ├─ b7/
│  │  ├─ b8/
│  │  ├─ b9/
│  │  ├─ ba/
│  │  ├─ bc/
│  │  ├─ be/
│  │  ├─ bf/
│  │  ├─ c1/
│  │  ├─ c4/
│  │  ├─ c5/
│  │  ├─ c6/
│  │  ├─ c8/
│  │  ├─ c9/
│  │  ├─ ca/
│  │  ├─ cb/
│  │  ├─ ce/
│  │  ├─ d1/
│  │  ├─ d2/
│  │  ├─ d5/
│  │  ├─ d7/
│  │  ├─ d9/
│  │  ├─ db/
│  │  ├─ dc/
│  │  ├─ dd/
│  │  ├─ de/
│  │  ├─ e0/
│  │  ├─ e1/
│  │  ├─ e2/
│  │  ├─ e3/
│  │  ├─ e4/
│  │  ├─ e6/
│  │  ├─ e7/
│  │  ├─ e8/
│  │  ├─ e9/
│  │  ├─ ea/
│  │  ├─ eb/
│  │  ├─ ec/
│  │  ├─ ee/
│  │  ├─ ef/
│  │  ├─ f0/
│  │  ├─ f2/
│  │  ├─ f3/
│  │  ├─ f5/
│  │  ├─ f6/
│  │  ├─ f8/
│  │  ├─ f9/
│  │  ├─ fa/
│  │  ├─ fb/
│  │  ├─ fc/
│  │  ├─ fd/
│  │  ├─ fe/
│  │  ├─ ff/
│  │  ├─ info/
│  │  ├─ pack/
│  ├─ ORIG_HEAD
│  ├─ packed-refs
│  ├─ refs/
│  │  ├─ heads/
│  │  ├─ remotes/
│  │  ├─ tags/
├─ observability/
│  ├─ prometheus.yml/
├─ platform/
│  ├─ compose/
│  │  ├─ alert.rules.yml/
│  │  ├─ cadvisor.unpublish.override.yml
│  │  ├─ compose.yml
│  │  ├─ compose.yml.bak.1760023095
│  │  ├─ compose.yml.bak.1760024560
│  │  ├─ compose.yml.bak.20251009-212227
│  │  ├─ day101.override.yml
│  │  ├─ day101.override.yml.bak
│  │  ├─ day8-1.override.yml
│  │  ├─ disable-legacy-frontend.override.yml
│  │  ├─ disable-legacy.override.yml
│  │  ├─ .env.local
│  │  ├─ grafana/
│  │  ├─ grafana-provisioning/
│  │  ├─ grafana.provisioning.addon.yml
│  │  ├─ grafana.provisioning.path.override.yml
│  │  ├─ grafana.writable.override.yml
│  │  ├─ metrics.addon.yml
│  │  ├─ observability/
│  │  ├─ observability.addon.yml
│  │  ├─ persistence.addon.yml
│  │  ├─ platform/
│  │  ├─ portainer_admin.txt
│  │  ├─ portainer-firstboot.override.yml
│  │  ├─ prometheus.rules.fix.override.yml
│  │  ├─ prometheus.yml
│  │  ├─ promtail-config.yml
│  ├─ observability/
│  │  ├─ grafana-provisioning/
│  │  ├─ prometheus.yml
│  │  ├─ prometheus.yml.bak
│  │  ├─ prometheus.yml.bak.1760201517
│  │  ├─ prometheus.yml.bak.1760201744
│  │  ├─ promtail-config.yml/
│  │  ├─ storefront.rules.yml
├─ portainer-2025-10-10-154906.tgz
├─ portainer-2025-10-10-171437.tgz
├─ prometheus-live.yml
├─ prometheus.rebuilt.yml
├─ public/
│  ├─ data/
│  │  ├─ products.json
│  ├─ placeholder/
├─ README.md
├─ scripts/
│  ├─ day9-sync.sh
│  ├─ tdp-daylog
│  ├─ tdp-down
│  ├─ tdp-status
│  ├─ tdp-up
├─ src/
│  ├─ components/
│  │  ├─ Shell.tsx
│  ├─ lib/
│  │  ├─ bff.ts
├─ STRUCTURE.md
├─ the-devops-playground/
├─ the-devops-playground.code-workspace
├─ .vscode/
│  ├─ launch.json
│  ├─ settings.json
│  ├─ START-HERE.md
│  └─ tasks.json
```
