// Asks a server for a link's status code without reading the page. Used by scripts/link-check.ts.
const TIMEOUT_MS = 15_000;

export type LinkResult = { kind: 'ok' | 'dead' | 'blocked' | 'other'; detail: string };

export async function linkStatus(url: string): Promise<LinkResult> {
  // HEAD first; some servers refuse HEAD, so fall back to GET and cancel before the body.
  for (const method of ['HEAD', 'GET']) {
    try {
      const res = await fetch(url, { method, redirect: 'follow', signal: AbortSignal.timeout(TIMEOUT_MS), headers: { 'User-Agent': 'SupSearch-link-check' } });
      await res.body?.cancel();
      if (method === 'HEAD' && (res.status === 405 || res.status === 501)) continue;
      if (res.ok) return { kind: 'ok', detail: String(res.status) };
      if (res.status === 404 || res.status === 410) return { kind: 'dead', detail: String(res.status) };
      if ([401, 403, 429].includes(res.status)) return { kind: 'blocked', detail: String(res.status) };
      return { kind: 'other', detail: String(res.status) };
    } catch (err) {
      const cause = err instanceof Error && err.cause instanceof Error ? `: ${err.cause.message}` : '';
      return { kind: 'blocked', detail: (err instanceof Error ? err.message : String(err)) + cause };
    }
  }
  return { kind: 'blocked', detail: 'HEAD and GET refused' };
}

