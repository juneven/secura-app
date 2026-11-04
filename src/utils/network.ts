import { runRequest } from '@/utils/request';

// Tanpa NetInfo: tidak tahu Wi-Fi/seluler, hasil hanya untuk url
export type ReachabilityResult =
  | { reachable: true; latencyMs: number; httpStatus: number; ok: boolean }
  | { reachable: false; reason: 'timeout' | 'network'; latencyMs: number }
  | { reachable: false; reason: 'cancelled' };

// Respons HTTP apa pun (termasuk 404/500) berarti server terjangkau
export async function checkReachability(
  url: string,
  timeoutMs = 5000,
  signal?: AbortSignal,
  headers?: Record<string, string>,
): Promise<ReachabilityResult> {
  const outcome = await runRequest((s) => fetch(url, { method: 'GET', cache: 'no-store', headers, signal: s }), {
    timeoutMs,
    slowAfterMs: timeoutMs, // tidak dipakai
    signal,
  });
  if (outcome.ok) {
    return { reachable: true, latencyMs: outcome.durationMs, httpStatus: outcome.data.status, ok: outcome.data.ok };
  }
  if (outcome.cancelled) return { reachable: false, reason: 'cancelled' };
  return {
    reachable: false,
    reason: outcome.error.kind === 'timeout' ? 'timeout' : 'network',
    latencyMs: outcome.durationMs,
  };
}
