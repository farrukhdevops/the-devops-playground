import Shell from "@/components/Shell";
import Link from "next/link";
export default function Home() {
  return (
    <Shell>
      <section className="py-12 text-center">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Build your dream desk.</h1>
        <p className="mt-3 text-slate-400">Keyboards, mice, monitors, storage, GPUs & more.</p>
        <div className="mt-6">
          <Link href="/catalog" className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500">Shop catalog</Link>
        </div>
      </section>
    </Shell>
  );
}
