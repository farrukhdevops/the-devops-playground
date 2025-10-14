export const config = {
  catalog: process.env.CATALOG_API_URL || "",
  orders:  process.env.ORDERS_API_URL  || "",
  payments:process.env.PAYMENTS_API_URL|| ""
};
export function targetFor(pathname: string) {
  const parts = pathname.replace(/^\/+/, "").split("/");
  const first = parts[0]; const tail = parts.slice(1).join("/");
  if (first === "catalog")  return { base: config.catalog,  tail };
  if (first === "orders")   return { base: config.orders,   tail };
  if (first === "payments") return { base: config.payments, tail };
  return null;
}
