let counts = new Map<string, number>();
export function record(route: string, ms: number) {
  counts.set(route, (counts.get(route) ?? 0) + 1);
}
export function renderMetrics(): string {
  const lines: string[] = [];
  lines.push('# HELP http_requests_total Total HTTP requests');
  lines.push('# TYPE http_requests_total counter');
  counts.forEach((v,k)=>lines.push(`http_requests_total{route="${k}"} ${v}`));
  return lines.join("\n") + "\n";
}
