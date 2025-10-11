"use client";
import Link from "next/link";
export default function Header(){
  return (
    <header className="sticky top-0 z-40 border-b bg-white/70 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">🛠️ The NexGear</Link>
        <nav className="space-x-4 text-sm">
          <Link href="/catalog">Catalog</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/about">About</Link>
        </nav>
      </div>
    </header>
  );
}
