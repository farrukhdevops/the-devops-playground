"use client";
export const dynamic = "force-dynamic"; // do not statically export this page

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Item = { id:number; title:string; brand:string; category:string; price_cents:number; image_url:string };

function CatalogInner() {
  const router = useRouter();
  const sp = useSearchParams();

  const page = Math.max(1, Number(sp.get("page") || 1));
  const q = sp.get("q") ?? "";
  const brand = sp.get("brand") ?? "";
  const category = sp.get("category") ?? "";
  const sort = sp.get("sort") ?? "relevance";

  const [items, setItems] = useState<Item[]>([]);
  const [total, setTotal] = useState(0);
  const limit = 12;
  const pages = useMemo(()=> Math.max(1, Math.ceil(total/limit)), [total]);

  useEffect(() => {
    const u = new URL("/api/bff/products", window.location.origin);
    u.searchParams.set("page", String(page));
    u.searchParams.set("limit", String(limit));
    if (q) u.searchParams.set("q", q);
    if (brand) u.searchParams.set("brand", brand);
    if (category) u.searchParams.set("category", category);
    if (sort) u.searchParams.set("sort", sort);
    fetch(u, { cache: "no-store" })
      .then(r=>r.json())
      .then(d=>{ setItems(d.items ?? []); setTotal(d.total ?? (d.items?.length||0)); })
      .catch(()=>{ setItems([]); setTotal(0); });
  }, [page, q, brand, category, sort]);

  const push = (kv: Record<string,string|number>) => {
    const u = new URL(window.location.href);
    Object.entries(kv).forEach(([k,v])=>{
      if (String(v)) u.searchParams.set(k, String(v)); else u.searchParams.delete(k);
    });
    u.searchParams.set("page","1");
    router.push(u.pathname + "?" + u.searchParams.toString());
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Catalog</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <input
          placeholder="Search…"
          className="border rounded p-2"
          defaultValue={q}
          onKeyDown={(e)=>{ if(e.key==="Enter") push({ q: (e.target as HTMLInputElement).value }); }}
        />
        <select className="border rounded p-2" value={brand} onChange={(e)=>push({ brand: e.target.value })}>
          <option value="">Brand (all)</option>
          <option>Logitech</option><option>Razer</option><option>LG</option><option>Dell</option>
          <option>ASUS</option><option>Samsung</option><option>NVIDIA</option><option>AMD</option>
          <option>Crucial</option><option>WD</option><option>Kingston</option><option>G.Skill</option>
          <option>Keychron</option><option>Leopold</option><option>SteelSeries</option><option>Zowie</option>
        </select>
        <select className="border rounded p-2" value={category} onChange={(e)=>push({ category: e.target.value })}>
          <option value="">Category (all)</option>
          <option value="keyboard">Keyboard</option><option value="mouse">Mouse</option>
          <option value="monitor">Monitor</option><option value="ssd">SSD</option>
          <option value="ram">RAM</option><option value="gpu">GPU</option>
        </select>
        <select className="border rounded p-2" value={sort} onChange={(e)=>push({ sort: e.target.value })}>
          <option value="relevance">Sort: Relevance</option>
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
        </select>
      </div>

      <div className="text-sm text-gray-500">{total} item(s)</div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(p=>(
          <a key={p.id} href={`/product/${p.id}`} className="border rounded-xl p-3 hover:shadow block">
            <img src={p.image_url} alt={p.title} className="h-24 object-contain mx-auto" />
            <div className="mt-2 font-medium">{p.title}</div>
            <div className="text-sm text-gray-600">{p.brand} • {p.category}</div>
            <div className="font-semibold mt-1">${(p.price_cents/100).toFixed(2)}</div>
          </a>
        ))}
      </div>

      <div className="flex gap-2">
        <button className="border rounded px-3 py-1 disabled:opacity-50"
          onClick={()=>router.push(`/catalog?page=${Math.max(1,page-1)}`)}
          disabled={page<=1}>Prev</button>
        <button className="border rounded px-3 py-1 disabled:opacity-50"
          onClick={()=>router.push(`/catalog?page=${Math.min(pages,page+1)}`)}
          disabled={page>=pages}>Next</button>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="text-sm text-gray-500">Loading catalog…</div>}>
      <CatalogInner />
    </Suspense>
  );
}
