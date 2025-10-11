import { cookies } from "next/headers";
import { randomUUID } from "crypto";

/** Ensure we always have a session cookie */
export function ensureSession(): string {
  const jar = cookies();
  let sid = jar.get("X-Session-ID")?.value;
  if (!sid) {
    sid = randomUUID();
    jar.set("X-Session-ID", sid, { httpOnly: false, sameSite: "lax", path: "/" });
  }
  return sid;
}

/** Minimal header forwarder for downstream APIs */
export function forwardHeaders(): Record<string,string> {
  const sid = ensureSession();
  return { "X-Session-ID": sid };
}
