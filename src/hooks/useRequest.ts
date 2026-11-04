import { useCallback, useEffect, useRef, useState } from 'react';
import { RequestError, runRequest } from '@/utils/request';

export type { RequestError, RequestErrorKind } from '@/utils/request';
export { fetchJson } from '@/utils/request';

export type RequestStatus = 'idle' | 'loading' | 'slow' | 'success' | 'error';

type Options = {
  /** Batas waktu total; request dianggap gagal (timeout) setelahnya. Default 10 detik. */
  timeoutMs?: number;
  /** Setelah ini request masih berjalan, status menjadi 'slow' (bukan error). Default 3 detik. */
  slowAfterMs?: number;
  /** Jalankan otomatis saat mount. */
  auto?: boolean;
};

/**
 * Hook request: loading -> slow -> success/error, retry, pembatalan saat unmount,
 * dan pengukuran waktu respons (durationMs). Tanpa library tambahan.
 */
export function useRequest<T>(fn: (signal: AbortSignal) => Promise<T>, opts: Options = {}) {
  const { auto = true } = opts;
  const [status, setStatus] = useState<RequestStatus>(auto ? 'loading' : 'idle');
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<RequestError | null>(null);
  const [durationMs, setDurationMs] = useState<number | null>(null);

  // Opsi & fn disimpan di ref agar `run` stabil dan tidak memicu ulang efek.
  const fnRef = useRef(fn);
  fnRef.current = fn;
  const optsRef = useRef(opts);
  optsRef.current = opts;
  const idRef = useRef(0);
  const abortRef = useRef<AbortController | null>(null);

  const run = useCallback(async () => {
    abortRef.current?.abort(); // membatalkan request sebelumnya (hasilnya diabaikan)
    const controller = new AbortController();
    abortRef.current = controller;
    const id = ++idRef.current;

    setStatus('loading');
    setError(null);

    const outcome = await runRequest(fnRef.current, {
      timeoutMs: optsRef.current.timeoutMs ?? 10000,
      slowAfterMs: optsRef.current.slowAfterMs ?? 3000,
      signal: controller.signal,
      onSlow: () => {
        if (id === idRef.current) setStatus((s) => (s === 'loading' ? 'slow' : s));
      },
    });

    if (id !== idRef.current) return; // basi atau sudah unmount
    if (!outcome.ok) {
      if (outcome.cancelled) return;
      setError(outcome.error);
      setDurationMs(outcome.durationMs);
      setStatus('error');
      return;
    }
    setData(outcome.data);
    setDurationMs(outcome.durationMs);
    setStatus('success');
  }, []);

  useEffect(() => {
    if (auto) void run();
    return () => {
      idRef.current++; // cegah setState setelah unmount
      abortRef.current?.abort();
    };
  }, [auto, run]);

  return { status, data, error, durationMs, retry: run, isLoading: status === 'loading' || status === 'slow' };
}
