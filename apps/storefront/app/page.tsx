export const dynamic = 'force-dynamic'; // avoid static prerender/export for "/"
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-b from-neutral-900 to-black text-gray-100">
      <img src="/brand/nexgear-logo.png" alt="NexGear" className="h-20 mb-8" />
      <h1 className="text-4xl font-bold mb-4">Performance. Precision. Power.</h1>
      <p className="max-w-xl text-gray-400 mb-8">
        Explore high-end peripherals and components engineered for creators, gamers, and professionals.
      </p>
      <Link href="/catalog" className="px-6 py-3 bg-blue-600 rounded-lg font-medium hover:bg-blue-700 transition">
        Browse Catalog
      </Link>
    </section>
  );
}
