import json, os
from datetime import datetime, timezone
try:
    import pika
except Exception:
    pika = None

_publisher = None

class _Publisher:
    def __init__(self, url: str, exchange: str = "catalog.events"):
        self.url = url
        self.exchange = exchange
        self.conn = None
        self.ch = None

    def connect(self):
        if pika is None: return
        params = pika.URLParameters(self.url)
        self.conn = pika.BlockingConnection(params)
        self.ch = self.conn.channel()
        self.ch.exchange_declare(exchange=self.exchange, exchange_type="topic", durable=True)

    def publish_product_created(self, product):
        if pika is None or not self.ch: return
        payload = {
            "id": product.id,
            "name": product.name,
            "description": product.description,
            "ts": datetime.now(timezone.utc).isoformat()
        }
        self.ch.basic_publish(
            exchange=self.exchange,
            routing_key="product.created",
            body=json.dumps(payload).encode(),
            properties=pika.BasicProperties(delivery_mode=2)
        )

    def close(self):
        try:
            if self.conn and self.conn.is_open:
                self.conn.close()
        except Exception:
            pass

def startup():
    global _publisher
    url = os.getenv("RABBITMQ_URL", "")
    if not url or pika is None:
        print("[messaging] disabled (pika missing or RABBITMQ_URL empty)")
        return
    _publisher = _Publisher(url)
    try:
        _publisher.connect()
        print("[messaging] connected")
    except Exception as e:
        print(f"[messaging] connect failed: {e}")

def shutdown():
    global _publisher
    if _publisher:
        _publisher.close()
        _publisher = None
        print("[messaging] closed")

def publish_product_created(product):
    try:
        if _publisher:
            _publisher.publish_product_created(product)
    except Exception as e:
        print(f"[messaging] publish failed: {e}")
