"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Shell({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);
  useEffect(() => { setCount(parseInt(localStorage.getItem("cartCount")||"0")); }, []);
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <header className="sticky top-0 z-20 backdrop-blur bg-slate-950/70 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight text-lg">PeriphX</Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/catalog">Catalog</Link>
            <Link href="/cart">Cart{count>0 && <span className="ml-1 px-2 py-0.5 text-xs bg-blue-600 rounded-full">{count}</span>}</Link>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
      <footer className="border-t border-slate-800 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-xs text-slate-400">
          © PeriphX — local demo • build: <span suppressHydrationWarning>{new Date().toISOString().slice(0,10)}</span>
        </div>
      </footer>
    </div>
  );
}
