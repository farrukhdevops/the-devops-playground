type CartItem = { id:number; qty:number };
const carts = new Map<string, Map<number, CartItem>>();

export function getCart(sid: string): Array<CartItem> {
  return Array.from(carts.get(sid)?.values() ?? []);
}
export function addToCart(sid: string, id: number, qty: number) {
  const bag = carts.get(sid) ?? new Map<number, CartItem>();
  const cur = bag.get(id) ?? { id, qty: 0 };
  cur.qty += qty;
  if (cur.qty <= 0) bag.delete(id); else bag.set(id, cur);
  carts.set(sid, bag);
}
export function setQty(sid: string, id: number, qty: number) {
  const bag = carts.get(sid) ?? new Map<number, CartItem>();
  if (qty <= 0) { bag.delete(id); carts.set(sid, bag); return; }
  bag.set(id, { id, qty });
  carts.set(sid, bag);
}
export function removeFromCart(sid: string, id: number) {
  const bag = carts.get(sid) ?? new Map<number, CartItem>();
  bag.delete(id);
  carts.set(sid, bag);
}
export function clearCart(sid: string) {
  carts.delete(sid);
}
