import { API_BASE_URL, API_CONFIG_PROBLEM, API_TIMEOUT_MS, AUTH_API_KEY, AUTH_BASE_URL, AUTH_CONFIG_PROBLEM } from '@/config/api';
import { NetworkError, runRequest } from '@/utils/request';

export type ApiErrorKind = 'not-configured' | 'timeout' | 'network' | 'http' | 'bad-response' | 'cancelled';
export type ApiError = { kind: ApiErrorKind; message: string; status?: number; code?: string; retryAfter?: number };
export type ApiResult<T> = { ok: true; data: T; durationMs: number } | { ok: false; error: ApiError };

// Pesan mentah dari server sengaja tidak ditampilkan
const CODE_MESSAGES: Record<string, string> = {
  INVALID_CREDENTIALS: 'Email atau password salah.',
  EMAIL_NOT_VERIFIED: 'Email belum diverifikasi.',
  EMAIL_TAKEN: 'Email sudah terdaftar.',
  CODE_INVALID: 'Kode salah. Periksa kembali kode di email Anda.',
  CODE_EXPIRED: 'Kode salah atau sudah kedaluwarsa. Periksa kode, atau minta kode baru.',
  RESET_TOKEN_INVALID: 'Sesi reset password sudah berakhir. Ulangi dari Forgot Password.',
  RATE_LIMITED: 'Terlalu banyak percobaan. Coba lagi beberapa saat lagi.',
  VALIDATION_ERROR: 'Data yang dikirim tidak valid.',
  WEAK_PASSWORD: 'Password terlalu lemah. Gunakan kombinasi huruf dan angka yang lebih panjang.',
  SAME_PASSWORD: 'Password baru harus berbeda dari password lama.',
  EMAIL_INVALID: 'Alamat email ditolak server. Gunakan email asli yang Anda kendalikan.',
  EMAIL_RATE_LIMITED: 'Batas pengiriman email tercapai. Layanan email bawaan Supabase sangat terbatas; tunggu beberapa menit atau pasang SMTP sendiri.',
  SIGNUP_DISABLED: 'Pendaftaran sedang dinonaktifkan di server.',
  EMAIL_SEND_FAILED: 'Server gagal mengirim email. Periksa pengaturan email di Supabase (Authentication > Logs).',
};

function httpMessage(status: number, code?: string): string {
  if (code && CODE_MESSAGES[code]) return CODE_MESSAGES[code];
  if (status === 429) return CODE_MESSAGES.RATE_LIMITED;
  if (status >= 500) return 'Server SECURA sedang bermasalah. Coba lagi nanti.';
  return `Permintaan gagal (HTTP ${status}).`;
}

type RawResponse = { status: number; ok: boolean; body: unknown };

// Jangan catat body ke log (bisa berisi password/token)
export async function apiPost(path: string, payload: unknown, signal?: AbortSignal): Promise<ApiResult<unknown>> {
  if (!API_BASE_URL) {
    return {
      ok: false,
      error: {
        kind: 'not-configured',
        message: API_CONFIG_PROBLEM ?? 'Server SECURA belum dikonfigurasi (EXPO_PUBLIC_API_URL kosong).',
      },
    };
  }
  const url = `${API_BASE_URL}${path}`;

  const outcome = await runRequest<RawResponse>(
    async (s) => {
      let res: Response;
      try {
        res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
          signal: s,
        });
      } catch (e) {
        if (s.aborted) throw e;
        throw new NetworkError();
      }
      let body: unknown = null;
      try {
        body = await res.json();
      } catch {
        body = null; // respons bukan JSON
      }
      return { status: res.status, ok: res.ok, body };
    },
    { timeoutMs: API_TIMEOUT_MS, signal },
  );

  if (!outcome.ok) {
    if (outcome.cancelled) return { ok: false, error: { kind: 'cancelled', message: 'Permintaan dibatalkan.' } };
    return { ok: false, error: { kind: outcome.error.kind === 'timeout' ? 'timeout' : 'network', message: outcome.error.message } };
  }

  const { status, ok, body } = outcome.data;
  if (!ok) {
    const code = isRecord(body) && typeof body.code === 'string' ? body.code : undefined;
    return { ok: false, error: { kind: 'http', status, code, message: httpMessage(status, code) } };
  }
  return { ok: true, data: body, durationMs: outcome.durationMs };
}

export function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}

// Kode error Supabase -> kode internal aplikasi
const SUPABASE_CODE_MAP: Record<string, string> = {
  invalid_credentials: 'INVALID_CREDENTIALS',
  email_not_confirmed: 'EMAIL_NOT_VERIFIED',
  otp_expired: 'CODE_EXPIRED',
  over_email_send_rate_limit: 'EMAIL_RATE_LIMITED',
  over_request_rate_limit: 'RATE_LIMITED',
  weak_password: 'WEAK_PASSWORD',
  same_password: 'SAME_PASSWORD',
  user_already_exists: 'EMAIL_TAKEN',
  email_exists: 'EMAIL_TAKEN',
  email_address_invalid: 'EMAIL_INVALID',
  validation_failed: 'VALIDATION_ERROR',
  signup_disabled: 'SIGNUP_DISABLED',
  bad_jwt: 'RESET_TOKEN_INVALID',
  session_expired: 'RESET_TOKEN_INVALID',
  session_not_found: 'RESET_TOKEN_INVALID',
  no_authorization: 'RESET_TOKEN_INVALID',
};

function supabaseCode(body: unknown): string | undefined {
  if (!isRecord(body)) return undefined;
  const raw = typeof body.error_code === 'string' ? body.error_code : undefined;
  if (raw && SUPABASE_CODE_MAP[raw]) return SUPABASE_CODE_MAP[raw];
  // Cadangan untuk respons lama tanpa error_code
  const msg = typeof body.msg === 'string' ? body.msg : typeof body.message === 'string' ? body.message : '';
  if (/expired or is invalid/i.test(msg)) return 'CODE_EXPIRED';
  if (/error sending .*email/i.test(msg)) return 'EMAIL_SEND_FAILED';
  return raw ? raw.toUpperCase() : undefined;
}

// Jangan catat body ke log (bisa berisi password/token/kode)
export async function authRequest(
  method: 'GET' | 'POST' | 'PUT',
  path: string,
  payload?: unknown,
  bearer?: string,
  signal?: AbortSignal,
): Promise<ApiResult<unknown>> {
  if (!AUTH_BASE_URL || !AUTH_API_KEY) {
    return {
      ok: false,
      error: { kind: 'not-configured', message: AUTH_CONFIG_PROBLEM ?? 'Supabase belum dikonfigurasi.' },
    };
  }
  const url = `${AUTH_BASE_URL}${path}`;
  const apiKey = AUTH_API_KEY;

  const outcome = await runRequest<RawResponse>(
    async (s) => {
      let res: Response;
      try {
        res = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            apikey: apiKey,
            ...(bearer ? { Authorization: `Bearer ${bearer}` } : {}),
          },
          body: payload === undefined ? undefined : JSON.stringify(payload),
          signal: s,
        });
      } catch (e) {
        if (s.aborted) throw e;
        throw new NetworkError();
      }
      let body: unknown = null;
      try {
        body = await res.json();
      } catch {
        body = null; // respons bukan JSON
      }
      return { status: res.status, ok: res.ok, body };
    },
    { timeoutMs: API_TIMEOUT_MS, signal },
  );

  if (!outcome.ok) {
    if (outcome.cancelled) return { ok: false, error: { kind: 'cancelled', message: 'Permintaan dibatalkan.' } };
    return { ok: false, error: { kind: outcome.error.kind === 'timeout' ? 'timeout' : 'network', message: outcome.error.message } };
  }

  const { status, ok, body } = outcome.data;
  if (!ok) {
    const code = supabaseCode(body);
    let message = httpMessage(status, code);
    // Tampilkan sisa jeda kirim ulang kode
    const rawMsg = isRecord(body) && typeof body.msg === 'string' ? body.msg : '';
    const wait = /after (\d+) seconds?/i.exec(rawMsg);
    const retryAfter = wait ? Number(wait[1]) : undefined;
    if (retryAfter !== undefined) message = `Tunggu ${retryAfter} detik sebelum meminta kode lagi.`;
    // 404/405: biasanya URL salah, tampilkan host (bukan rahasia)
    if (status === 404 || status === 405) {
      const host = AUTH_BASE_URL.replace(/^https:\/\//, '').split('/')[0];
      message += ` Periksa EXPO_PUBLIC_SUPABASE_URL (sekarang menuju ${host}).`;
    }
    return { ok: false, error: { kind: 'http', status, code, message, retryAfter } };
  }
  return { ok: true, data: body, durationMs: outcome.durationMs };
}