import { useSyncExternalStore } from 'react';
import { NETWORK_CONFIG } from '@/config/network';
import { checkReachability } from '@/utils/network';

// 'not-configured' dan 'unchecked' bukan berarti online
export type ProbeStatus =
  | { state: 'not-configured' }
  | { state: 'unchecked' }
  | { state: 'reachable'; latencyMs: number; httpStatus: number; ok: boolean }
  | { state: 'unreachable'; reason: 'timeout' | 'network' }
  | { state: 'cancelled' };

export type ConnectivityReport = { internet: ProbeStatus; server: ProbeStatus; checkedAt: number | null };

export async function probe(
  url: string | null,
  timeoutMs: number,
  signal?: AbortSignal,
  headers?: Record<string, string>,
): Promise<ProbeStatus> {
  if (!url) return { state: 'not-configured' };
  const r = await checkReachability(url, timeoutMs, signal, headers);
  if (r.reachable) return { state: 'reachable', latencyMs: r.latencyMs, httpStatus: r.httpStatus, ok: r.ok };
  if (r.reason === 'cancelled') return { state: 'cancelled' };
  return { state: 'unreachable', reason: r.reason };
}

export function describeProbe(p: ProbeStatus, what: 'internet' | 'server'): string {
  switch (p.state) {
    case 'not-configured':
      return what === 'internet' ? 'belum dicek (alamat uji belum diatur)' : 'belum dikonfigurasi';
    case 'unchecked':
      return 'belum dicek';
    case 'reachable':
      return p.ok ? `terjangkau (${p.latencyMs} ms)` : `merespons error HTTP ${p.httpStatus} (${p.latencyMs} ms)`;
    case 'unreachable':
      return p.reason === 'timeout' ? 'tidak terjangkau (timeout)' : 'tidak terjangkau';
    case 'cancelled':
      return 'pengecekan dibatalkan';
  }
}

const initial = (url: string | null): ProbeStatus => (url ? { state: 'unchecked' } : { state: 'not-configured' });

let report: ConnectivityReport = {
  internet: initial(NETWORK_CONFIG.internetProbeUrl),
  server: initial(NETWORK_CONFIG.apiHealthUrl),
  checkedAt: null,
};
const listeners = new Set<() => void>();

export function setConnectivityReport(next: ConnectivityReport) {
  report = next;
  listeners.forEach((l) => l());
}

export function useConnectivityReport(): ConnectivityReport {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => {
        listeners.delete(cb);
      };
    },
    () => report,
    () => report,
  );
}
