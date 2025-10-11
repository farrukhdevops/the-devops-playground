"use client";
export const dynamic = "force-dynamic";

import { useEffect, useMemo, useState } from "react";

type CartItem = { id:number; qty:number };
type Product = { id:number; title:string; price_cents:number; image_url:string };

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  // Load cart & product prices for subtotal
  useEffect(()=>{
    fetch("/api/bff/cart").then(r=>r.json()).then(d=>setItems(d.items ?? []));
    fetch("/api/bff/products?page=1&limit=48").then(r=>r.json()).then(d=>setProducts(d.items ?? []));
  }, []);

  const map = useMemo(()=>Object.fromEntries(products.map(p=>[String(p.id), p])), [products]);
  const subtotal = items.reduce((sum,i)=> sum + (map[String(i.id)]?.price_cents ?? 0) * i.qty, 0);

  const patchQty = async (id:number, qty:number) => {
    const r = await fetch("/api/bff/cart", { method:"PATCH", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ id, qty }) });
    const d = await r.json(); setItems(d.items ?? []);
  };
  const removeItem = async (id:number) => {
    const r = await fetch("/api/bff/cart", { method:"DELETE", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ id }) });
    const d = await r.json(); setItems(d.items ?? []);
  };

  return (
    <section className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Your cart</h1>
      {items.length === 0 && <div className="text-gray-600">Cart is empty.</div>}
      {items.length > 0 &&
        <ul className="space-y-3">
          {items.map(i=>{
            const p = map[String(i.id)];
            return (
              <li key={i.id} className="border rounded p-3 flex items-center gap-4">
                <img src={p?.image_url ?? "/brand/logo.png"} alt="" className="h-12 w-12 object-contain" />
                <div className="flex-1">
                  <div className="font-medium">{p?.title ?? `Item #${i.id}`}</div>
                  <div className="text-sm text-gray-500">${p ? (p.price_cents/100).toFixed(2) : "--"}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="border px-2" onClick={()=>patchQty(i.id, Math.max(0, i.qty-1))}>-</button>
                  <span className="w-6 text-center">{i.qty}</span>
                  <button className="border px-2" onClick={()=>patchQty(i.id, i.qty+1)}>+</button>
                </div>
                <button className="ml-4 text-red-600" onClick={()=>removeItem(i.id)}>Remove</button>
              </li>
            );
          })}
        </ul>
      }
      <div className="text-right text-lg font-semibold">
        Subtotal: ${(subtotal/100).toFixed(2)}
      </div>
      <a href="/checkout" className="inline-block mt-2 px-4 py-2 bg-black text-white rounded disabled:opacity-50"
         aria-disabled={items.length===0}>Checkout</a>
    </section>
  );
}
