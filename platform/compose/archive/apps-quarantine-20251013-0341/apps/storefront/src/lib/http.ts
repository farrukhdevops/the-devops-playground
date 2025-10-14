export async function fetchJson<T>(url: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(url, { ...init, headers: { "content-type": "application/json", ...(init.headers || {}) } });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText} — ${url} — ${txt}`);
  }
  return res.json() as Promise<T>;
}
// alias for legacy import sites
export const jfetch = fetchJson;
