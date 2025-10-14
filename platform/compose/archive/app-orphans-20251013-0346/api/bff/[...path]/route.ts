import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { targetFor } from "@/lib/bff";

export const dynamic = "force-dynamic";

function getSessionCookie() {
  const jar = cookies();
  let sid = jar.get("x-session-id")?.value;
  if (!sid) {
    sid = randomUUID();
    jar.set("x-session-id", sid, { httpOnly: false, sameSite: "lax", path: "/" });
  }
  return sid;
}

async function fallbackCatalog(req: NextRequest) {
  const url = new URL(req.url);
  const parts = url.pathname.split("/");
  const last = parts[parts.length-1];
  const r = await fetch(new URL("/data/products.json", req.nextUrl.origin));
  const data = await r.json();
  if (last && last !== "products") {
    const item = data.find((p: any) => p.id === last);
    return NextResponse.json(item ?? { error: "not found" }, { status: item ? 200 : 404 });
  }
  return NextResponse.json({ items: data, total: data.length, page: 1, size: data.length });
}

export async function GET(req: NextRequest)  { return handle(req, "GET"); }
export async function POST(req: NextRequest) { return handle(req, "POST"); }
export async function PUT(req: NextRequest)  { return handle(req, "PUT"); }
export async function PATCH(req: NextRequest){ return handle(req, "PATCH"); }
export async function DELETE(req: NextRequest){ return handle(req, "DELETE"); }

async function handle(req: NextRequest, method: string) {
  const sid = getSessionCookie();
  const upstreamPath = new URL(req.url).pathname.replace(/^\/api\/bff/, "");
  const tgt = targetFor(upstreamPath);
  if (!tgt || !tgt.base) {
    if (upstreamPath.startsWith("/catalog/products")) return fallbackCatalog(req);
    return NextResponse.json({ error: "BFF upstream not configured" }, { status: 501 });
  }
  const upstream = `${tgt.base.replace(/\/$/,"")}/${tgt.tail.replace(/^\/+/,"")}`;
  const init: RequestInit = {
    method,
    headers: {
      "content-type": req.headers.get("content-type") ?? "application/json",
      "x-session-id": sid
    },
    body: ["GET","DELETE"].includes(method) ? undefined : await req.arrayBuffer()
  };
  try {
    const r = await fetch(upstream, init as any);
    const buf = await r.arrayBuffer();
    const res = new NextResponse(buf, { status: r.status });
    res.headers.set("content-type", r.headers.get("content-type") ?? "application/json");
    return res;
  } catch (e:any) {
    return NextResponse.json({ error: "upstream unavailable", detail: String(e) }, { status: 502 });
  }
}
