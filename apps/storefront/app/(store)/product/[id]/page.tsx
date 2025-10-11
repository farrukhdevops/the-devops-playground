"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";

export default function PDP({ params }: { params: { id: string } }) {
  const [p, setP] = useState<any>(null);
  useEffect(()=>{ fetch(`/api/bff/products/${params.id}`).then(r=>r.json()).then(setP); }, [params.id]);
  if (!p) return <div className="p-6">Loading…</div>;
  return (
    <div className="p-6 grid md:grid-cols-2 gap-6">
      <img src={p.image_url} alt={p.title} className="h-64 object-contain mx-auto" />
      <div>
        <h1 className="text-2xl font-semibold">{p.title}</h1>
        <div className="text-gray-600">{p.brand} • {p.category}</div>
        <div className="text-2xl font-bold mt-2">${(p.price_cents/100).toFixed(2)}</div>
        <button className="mt-4 px-4 py-2 bg-black text-white rounded"
          onClick={async()=>{
            await fetch("/api/bff/cart", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ id: p.id, qty: 1 }) });
            window.location.href="/cart";
          }}>Add to Cart</button>
      </div>
    </div>
  );
}
