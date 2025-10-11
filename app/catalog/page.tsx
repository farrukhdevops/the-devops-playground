import Shell from "@/components/Shell";
async function fetchProducts() {
  const r = await fetch(`/api/bff/catalog/products`, { cache: "no-store" });
  return r.json();
}
export default async function CatalogPage() {
  const data = await fetchProducts();
  const items = data.items || [];
  return (
    <Shell>
      <h2 className="text-2xl font-semibold mb-6">Catalog</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((p:any) => (
          <a key={p.id} href={`/catalog/products/${p.id}`} className="group border border-slate-800 rounded-xl overflow-hidden hover:border-blue-600 transition">
            <div className="aspect-[4/3] bg-slate-900" />
            <div className="p-3">
              <div className="text-sm text-slate-400">{p.brand}</div>
              <div className="font-medium">{p.title}</div>
              <div className="mt-1 text-blue-300">${(p.price_cents/100).toFixed(2)}</div>
            </div>
          </a>
        ))}
      </div>
    </Shell>
  );
}
