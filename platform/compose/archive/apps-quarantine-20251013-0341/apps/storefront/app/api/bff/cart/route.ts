import { NextRequest, NextResponse } from "next/server";
import { ensureSession } from "@/lib/session";
import { addToCart, getCart, setQty, removeFromCart } from "@/lib/cartStore";
import { jlog } from "@/lib/logger";
import { record } from "@/lib/metrics";

export const dynamic = "force-dynamic";

export async function GET() {
  const sid = ensureSession();
  return NextResponse.json({ items: getCart(sid) });
}
export async function POST(req: NextRequest) {
  const sid = ensureSession();
  const { id, qty } = await req.json();
  addToCart(sid, Number(id), Number(qty ?? 1));
  record("/api/bff/cart", 0);
  jlog({ level: "info", route: "/api/bff/cart", action: "add", id, qty, sid });
  return NextResponse.json({ ok: true, items: getCart(sid) });
}
export async function PATCH(req: NextRequest) {
  const sid = ensureSession();
  const { id, qty } = await req.json();
  setQty(sid, Number(id), Math.max(0, Number(qty ?? 0)));
  record("/api/bff/cart", 0);
  jlog({ level: "info", route: "/api/bff/cart", action: "patch", id, qty, sid });
  return NextResponse.json({ ok: true, items: getCart(sid) });
}
export async function DELETE(req: NextRequest) {
  const sid = ensureSession();
  const { id } = await req.json();
  removeFromCart(sid, Number(id));
  record("/api/bff/cart", 0);
  jlog({ level: "info", route: "/api/bff/cart", action: "delete", id, sid });
  return NextResponse.json({ ok: true, items: getCart(sid) });
}
