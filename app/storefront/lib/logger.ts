export function jlog(obj: Record<string, unknown>) {
  try { process.stdout.write(JSON.stringify({service:"storefront", ts:new Date().toISOString(), ...obj})+"\n"); } catch {}
}
