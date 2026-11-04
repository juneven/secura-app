import { NETWORK_CONFIG } from '@/config/network';
import { ConnectivityReport, probe, setConnectivityReport } from '@/services/connectivity';

export type StartupOutcome =
  | { status: 'ready' }
  | { status: 'blocked'; message: string }
  | { status: 'cancelled' };

// Uji internet dan server; selesai seketika jika tak diatur
export async function runStartup(signal: AbortSignal): Promise<StartupOutcome> {
  const { internetProbeUrl, apiHealthUrl, apiHealthHeaders, probeTimeoutMs } = NETWORK_CONFIG;
  const [internet, server] = await Promise.all([
    probe(internetProbeUrl, probeTimeoutMs, signal),
    probe(apiHealthUrl, probeTimeoutMs, signal, apiHealthHeaders),
  ]);
  if (signal.aborted) return { status: 'cancelled' };

  const report: ConnectivityReport = { internet, server, checkedAt: Date.now() };
  setConnectivityReport(report);

  if (server.state === 'reachable') {
    if (server.ok) return { status: 'ready' };
    return { status: 'blocked', message: `Server SECURA merespons dengan error (HTTP ${server.httpStatus}).` };
  }
  if (server.state === 'unreachable') {
    if (internet.state === 'unreachable') return { status: 'blocked', message: 'Tidak ada akses internet.' };
    if (internet.state === 'reachable') return { status: 'blocked', message: 'Internet tersedia, tetapi server SECURA tidak dapat dijangkau.' };
    return { status: 'blocked', message: 'Server SECURA tidak dapat dijangkau (penyebabnya belum bisa dipastikan).' };
  }
  // Server belum diatur: hanya internet yang dinilai
  if (internet.state === 'unreachable') return { status: 'blocked', message: 'Tidak ada akses internet.' };
  return { status: 'ready' };
}
