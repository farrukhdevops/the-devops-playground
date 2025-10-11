import { renderMetrics } from "@/lib/metrics";
export async function GET() {
  return new Response(renderMetrics(), { headers: { "Content-Type": "text/plain" } });
}
