export type Product = {
  id: string;
  sku: string;
  title: string;
  brand: string;
  category: string;
  price_cents: number;
  image_url: string;
  short_desc: string;
  specs: Record<string, string | number>;
  available: number;
};

export type Catalog = { items: Product[] };
