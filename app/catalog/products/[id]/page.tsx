import Shell from "@/components/Shell";
async function fetchProduct(id: string) {
  const r = await fetch(`/api/bff/catalog/products/${id}`, { cache: "no-store" });
  return r.json();
}
export default async function PDP({ params }: { params: { id: string } }) {
  const p = await fetchProduct(params.id);
  if (!p || p.error) return <Shell><p>Product not found.</p></Shell>;
  return (
    <Shell>
      <div className="md:grid md:grid-cols-2 gap-10">
        <div className="bg-slate-900 aspect-[4/3] rounded-xl" />
        <div>
          <div className="text-sm text-slate-400">{p.brand}</div>
          <h1 className="text-2xl font-semibold">{p.title}</h1>
          <div className="mt-2 text-2xl text-blue-300">${(p.price_cents/100).toFixed(2)} {p.on_sale && <span className="ml-2 text-sm line-through text-slate-500">${(p.msrp_cents/100).toFixed(2)}</span>}</div>
          <p className="mt-4 text-slate-300">{p.short_desc}</p>
          <form action="/cart" method="post" className="mt-6">
            <button formAction={`/api/local/add-to-cart?id=${p.id}`} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500">Add to cart</button>
          </form>
          <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
            {Object.entries(p.specs||{}).map(([k,v])=>(
              <div key={k}><dt className="text-slate-400">{k}</dt><dd className="font-medium">{String(v)}</dd></div>
            ))}
          </dl>
        </div>
      </div>
    </Shell>
  );
}
