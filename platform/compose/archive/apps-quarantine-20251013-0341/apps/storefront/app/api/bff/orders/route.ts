import { NextRequest, NextResponse } from "next/server";
import { cfg } from "@/lib/config";
import { ensureSession, forwardHeaders } from "@/lib/session";
import { clearCart, getCart } from "@/lib/cartStore";
import { jlog } from "@/lib/logger";
import { record } from "@/lib/metrics";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const t0 = Date.now();
  const sid = ensureSession();
  const body = await req.json().catch(()=> ({}));
  const items = getCart(sid);
  let orderId = `ord_${Math.random().toString(36).slice(2,10)}`;

  if (!cfg.bffMockEnabled) {
    try {
      const r = await fetch(`${cfg.ordersUrl}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...forwardHeaders() },
        body: JSON.stringify({ ...body, items }),
        cache: "no-store",
      });
      if (r.ok) {
        const data = await r.json();
        orderId = data.id ?? orderId;
      }
    } catch (e) {
      jlog({ level:"warn", route:"/api/bff/orders", msg:"upstream_failed", error:String(e) });
    }
  }

  clearCart(sid);
  record("/api/bff/orders", Date.now()-t0);
  jlog({ level:"info", route:"/api/bff/orders", action:"create", order_id:orderId, items:items.length, sid });
  return NextResponse.json({ id: orderId, status: "processing" });
}
