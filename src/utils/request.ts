// Timeout selalu ditegakkan lewat balapan Promise
export type RequestErrorKind = 'timeout' | 'network' | 'http' | 'unknown';
export type RequestError = { kind: RequestErrorKind; message: string; status?: number };

export class HttpError extends Error {
  status: number;
  constructor(status: number) {
    super(`HTTP ${status}`);
    this.name = 'HttpError';
    this.status = status;
  }
}

export class NetworkError extends Error {
  constructor() {
    super('Network request failed');
    this.name = 'NetworkError';
  }
}

// Non-2xx = HttpError; tanpa respons = NetworkError
export async function fetchJson<T>(url: string, signal: AbortSignal): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url, { signal });
  } catch (e) {
    if (signal.aborted) throw e; // diklasifikasi oleh runRequest
    throw new NetworkError();
  }
  if (!res.ok) throw new HttpError(res.status);
  return (await res.json()) as T;
}

export type RunOptions = {
  timeoutMs: number;
  slowAfterMs?: number;
  onSlow?: () => void;
  signal?: AbortSignal;
};

export type RequestOutcome<T> =
  | { ok: true; data: T; durationMs: number }
  | { ok: false; cancelled: false; error: RequestError; durationMs: number }
  | { ok: false; cancelled: true };

function classify(e: unknown, timedOut: boolean): RequestError {
  if (timedOut) return { kind: 'timeout', message: 'Permintaan terlalu lama. Coba lagi.' };
  if (e instanceof HttpError) return { kind: 'http', status: e.status, message: `Server mengembalikan error (HTTP ${e.status}).` };
  if (e instanceof NetworkError) return { kind: 'network', message: 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.' };
  return { kind: 'unknown', message: 'Terjadi kesalahan tak terduga.' };
}

export async function runRequest<T>(
  fn: (signal: AbortSignal) => Promise<T>,
  { timeoutMs, slowAfterMs = 3000, onSlow, signal }: RunOptions,
): Promise<RequestOutcome<T>> {
  if (signal?.aborted) return { ok: false, cancelled: true };

  const controller = new AbortController();
  let timedOut = false;
  let cancelled = false;
  let rejectRace: (reason: unknown) => void = () => {};
  const race = new Promise<never>((_, reject) => {
    rejectRace = reject;
  });
  race.catch(() => {}); // cegah unhandled rejection

  const onExternalAbort = () => {
    cancelled = true;
    controller.abort();
    rejectRace(new Error('cancelled'));
  };
  signal?.addEventListener('abort', onExternalAbort);

  const startedAt = Date.now();
  const timeoutTimer = setTimeout(() => {
    timedOut = true;
    controller.abort();
    rejectRace(new Error('timeout'));
  }, timeoutMs);
  const slowTimer = onSlow ? setTimeout(onSlow, slowAfterMs) : undefined;

  try {
    const work = Promise.resolve().then(() => fn(controller.signal));
    work.catch(() => {}); // abaikan hasil terlambat
    const data = await Promise.race([work, race]);
    return { ok: true, data, durationMs: Date.now() - startedAt };
  } catch (e) {
    if (cancelled) return { ok: false, cancelled: true };
    return { ok: false, cancelled: false, error: classify(e, timedOut), durationMs: Date.now() - startedAt };
  } finally {
    clearTimeout(timeoutTimer);
    if (slowTimer) clearTimeout(slowTimer);
    signal?.removeEventListener('abort', onExternalAbort);
  }
}
