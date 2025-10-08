import os, json, time
import pika

URL = os.getenv("RABBITMQ_URL", "")
params = pika.URLParameters(URL or "amqp://guest:guest@rabbitmq:5672/")

def main():
    print("[inventory-worker] starting...")
    conn = pika.BlockingConnection(params)
    ch = conn.channel()
    ch.exchange_declare(exchange="catalog.events", exchange_type="topic", durable=True)
    ch.queue_declare(queue="inventory.products", durable=True)
    ch.queue_bind(queue="inventory.products", exchange="catalog.events", routing_key="product.created")

    def cb(ch, method, props, body):
        try:
            print("[inventory-worker] received:", body.decode())
            ch.basic_ack(delivery_tag=method.delivery_tag)
        except Exception as e:
            print("[inventory-worker] error:", e)
            ch.basic_nack(delivery_tag=method.delivery_tag, requeue=True)

    ch.basic_qos(prefetch_count=10)
    ch.basic_consume(queue="inventory.products", on_message_callback=cb)
    print("[inventory-worker] consuming…")
    ch.start_consuming()

if __name__ == "__main__":
    while True:
        try:
            main()
        except Exception as e:
            print("[inventory-worker] crashed:", e, "— retrying in 2s")
            time.sleep(2)
