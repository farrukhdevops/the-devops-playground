import { NextRequest, NextResponse } from "next/server";
import { cfg } from "@/lib/config";
import { jlog } from "@/lib/logger";
import { record } from "@/lib/metrics";

export const dynamic = "force-dynamic";

function applyFilters(items: any[], q: string, brand: string, category: string) {
  let out = items;
  if (q) {
    const s = q.toLowerCase();
    out = out.filter((x:any)=>`${x.title} ${x.brand} ${x.category}`.toLowerCase().includes(s));
  }
  if (brand) out = out.filter((x:any)=>String(x.brand).toLowerCase() === brand.toLowerCase());
  if (category) out = out.filter((x:any)=>String(x.category).toLowerCase() === category.toLowerCase());
  return out;
}
function applySort(items: any[], sort: string) {
  if (sort === "price_asc") return items.slice().sort((a:any,b:any)=>a.price_cents-b.price_cents);
  if (sort === "price_desc") return items.slice().sort((a:any,b:any)=>b.price_cents-a.price_cents);
  return items;
}

export async function GET(req: NextRequest) {
  const t0 = Date.now();
  try {
    const page = Math.max(1, Number(req.nextUrl.searchParams.get("page") ?? 1));
    const limit = Math.max(1, Math.min(48, Number(req.nextUrl.searchParams.get("limit") ?? 12)));
    const q = req.nextUrl.searchParams.get("q") ?? "";
    const brand = req.nextUrl.searchParams.get("brand") ?? "";
    const category = req.nextUrl.searchParams.get("category") ?? "";
    const sort = req.nextUrl.searchParams.get("sort") ?? "relevance";

    // Upstream first
    if (!cfg.bffMockEnabled) {
      const url = new URL("/products", cfg.catalogUrl);
      req.nextUrl.searchParams.forEach((v,k)=>url.searchParams.set(k,v));
      const r = await fetch(url, { cache: "no-store" });
      if (r.ok) {
        const data = await r.json();
        record("/api/bff/products", Date.now()-t0);
        return NextResponse.json(data);
      }
    }

    // Seed fallback
    const origin = new URL(req.url).origin;
    const seed: any[] = await fetch(new URL("/data/catalog.seed.json", origin)).then(r=>r.json());
    let filtered = applyFilters(seed, q, brand, category);
    filtered = applySort(filtered, sort);
    const total = filtered.length;
    const start = (page-1)*limit;
    const items = filtered.slice(start, start+limit);

    record("/api/bff/products", Date.now()-t0);
    return NextResponse.json({ items, total, page, limit });
  } catch (e:any) {
    jlog({ level:"warn", route:"/api/bff/products", msg:"fallback_error", error: String(e) });
    record("/api/bff/products", Date.now()-t0);
    return NextResponse.json({ items: [], total: 0, page: 1, limit: 12 }, { status: 200 });
  }
}
