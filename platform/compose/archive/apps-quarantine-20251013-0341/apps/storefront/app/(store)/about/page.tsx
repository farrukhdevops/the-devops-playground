"use client";
export const dynamic = "force-dynamic";

export default function About() {
  return (
    <section className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">About NexGear</h1>
      <p className="text-gray-600">
        NexGear is our homelab e-commerce showcase for high-performance PC peripherals and components.
        Built with Next.js (App Router) and a BFF that proxies to our catalog and orders services,
        with Prometheus metrics and Loki logs wired in.
      </p>
      <ul className="list-disc pl-6 text-gray-700">
        <li>Dynamic catalog with pagination & filters</li>
        <li>Seed fallback when upstream is down</li>
        <li>Structured JSON logs (Promtail → Loki)</li>
        <li>HTTP metrics at <code>/metrics</code> for Prometheus</li>
      </ul>
      <p className="text-gray-600">
        Part of <b>The DevOps Playground</b> stack on port <code>8080</code>.
      </p>
    </section>
  );
}
