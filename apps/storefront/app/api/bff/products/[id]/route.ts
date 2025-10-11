import { NextRequest, NextResponse } from "next/server";
import { cfg } from "@/lib/config";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!cfg.bffMockEnabled) {
    try {
      const r = await fetch(`${cfg.catalogUrl}/products/${params.id}`, { cache:"no-store" });
      if (r.ok) return NextResponse.json(await r.json());
    } catch {}
  }
  const seed = await fetch(new URL("/data/catalog.seed.json", new URL(req.url).origin)).then(r=>r.json());
  const item = seed.find((x:any)=>String(x.id)===params.id);
  return item ? NextResponse.json(item) : NextResponse.json({ error: "not found" }, { status: 404 });
}
