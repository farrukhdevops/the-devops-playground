import time, sys
from prometheus_client import start_http_server, Counter, Gauge
start_http_server(9101)  # listen on 0.0.0.0:9101
HEARTBEATS = Counter("ai_worker_heartbeats_total", "AI worker heartbeats")
RUNNING = Gauge("ai_worker_running", "AI worker running state",)
RUNNING.set(1)
print("ai-worker starting")
while True:
    HEARTBEATS.inc()
    print("ai-worker heartbeat")
    sys.stdout.flush()
    time.sleep(5)
