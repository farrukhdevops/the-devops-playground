import 'server-only';
import { cookies, headers } from "next/headers";
import { randomUUID } from "crypto";

const COOKIE = "tdp_session_id";

export function ensureSession(): string {
  const sidHeader = headers().get("x-session-id");
  if (sidHeader && sidHeader.length > 0) return sidHeader;

  const jar = cookies();
  let sid = jar.get(COOKIE)?.value;
  if (!sid) {
    sid = randomUUID();
    try {
      jar.set(COOKIE, sid, { httpOnly: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 30, path: "/" });
    } catch {}
  }
  return sid;
}

export function forwardHeaders(extra: Record<string,string> = {}): Record<string,string> {
  const sid = ensureSession();
  const reqId = randomUUID();
  return { "x-session-id": sid, "x-request-id": reqId, ...extra };
}

export const getSessionId = ensureSession;
