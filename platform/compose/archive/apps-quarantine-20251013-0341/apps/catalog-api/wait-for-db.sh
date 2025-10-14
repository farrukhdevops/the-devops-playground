#!/bin/sh
set -e
python - <<PY
import os, time
import psycopg2
url = os.getenv("DATABASE_URL","postgresql://catalog_user:catalog_pass@postgres:5432/catalog")
for _ in range(30):
    try:
        psycopg2.connect(url.replace("+psycopg2",""))
        break
    except Exception:
        time.sleep(1)
else:
    raise SystemExit("DB not ready")
PY
exec "$@"
