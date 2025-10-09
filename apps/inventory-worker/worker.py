import time, sys
from prometheus_client import start_http_server, Counter, Gauge
start_http_server(9102)  # listen on 0.0.0.0:9102
HEARTBEATS = Counter("inventory_worker_heartbeats_total", "Inventory worker heartbeats")
RUNNING = Gauge("inventory_worker_running", "Inventory worker running state")
RUNNING.set(1)
print("inventory-worker starting")
while True:
    HEARTBEATS.inc()
    print("inventory-worker heartbeat")
    sys.stdout.flush()
    time.sleep(5)
