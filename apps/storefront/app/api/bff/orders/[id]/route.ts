import { NextRequest, NextResponse } from "next/server";
import { cfg } from "@/lib/config";
import { forwardHeaders } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!cfg.bffMockEnabled) {
    try {
      const r = await fetch(`${cfg.ordersUrl}/orders/${params.id}`, {
        headers: { ...forwardHeaders() },
        cache: "no-store",
      });
      if (r.ok) return NextResponse.json(await r.json());
    } catch {}
  }
  // Fallback sim
  const ok = Math.random() > 0.2;
  return NextResponse.json({ id: params.id, status: ok ? "confirmed" : "rejected" });
}
