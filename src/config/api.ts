// Backend lama: HTTPS wajib, http:// hanya saat __DEV__
const raw = (process.env.EXPO_PUBLIC_API_URL ?? '').trim().replace(/\/+$/, '');

const isAllowed = raw.startsWith('https://') || (__DEV__ && raw.startsWith('http://'));

export const API_BASE_URL: string | null = raw && isAllowed ? raw : null;

export const API_CONFIG_PROBLEM: string | null =
  raw && !isAllowed ? 'EXPO_PUBLIC_API_URL harus diawali https://' : null;

export const API_TIMEOUT_MS = 10000;

// Endpoint backend lama
export const ENDPOINTS = {
  health: '/health',
  register: '/auth/register',
  verifyEmail: '/auth/verify-email',
  resendVerification: '/auth/resend-verification',
  login: '/auth/login',
  forgotPassword: '/auth/forgot-password',
  verifyResetCode: '/auth/verify-reset-code',
  resetPassword: '/auth/reset-password',
  socialStart: (provider: 'google' | 'apple') => `/auth/${provider}/start`,
  socialExchange: '/auth/social/exchange',
} as const;

// Supabase Auth: hanya kunci publishable yang boleh ada di app
const supaUrl = (process.env.EXPO_PUBLIC_SUPABASE_URL ?? '').trim().replace(/\/+$/, '');
const supaKey = (process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? '').trim();

function findAuthProblem(): string | null {
  if (!supaUrl || !supaKey) {
    return 'Supabase belum dikonfigurasi: isi EXPO_PUBLIC_SUPABASE_URL dan EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY di .env.local, lalu jalankan npx expo start -c.';
  }
  if (!supaUrl.startsWith('https://')) return 'EXPO_PUBLIC_SUPABASE_URL harus diawali https://';
  // Deteksi salah salin URL (mis. alamat dashboard)
  const parts = supaUrl.match(/^https:\/\/([^/]+)(\/.*)?$/i);
  const host = parts?.[1] ?? '';
  const path = parts?.[2] ?? '';
  if (/^(www\.|app\.)?supabase\.com$/i.test(host)) {
    return 'EXPO_PUBLIC_SUPABASE_URL salah: itu alamat dashboard. Pakai Project URL berbentuk https://xxxx.supabase.co';
  }
  if (path) return 'EXPO_PUBLIC_SUPABASE_URL harus berhenti di .supabase.co, tanpa /path apa pun di belakangnya.';
  if (supaKey.startsWith('sb_secret_')) return 'Jangan pakai secret key di aplikasi. Pakai Publishable key (sb_publishable_...).';
  return null;
}

export const AUTH_CONFIG_PROBLEM: string | null = findAuthProblem();
export const AUTH_CONFIGURED = AUTH_CONFIG_PROBLEM === null;
export const AUTH_BASE_URL: string | null = AUTH_CONFIGURED ? `${supaUrl}/auth/v1` : null;
export const AUTH_API_KEY: string | null = AUTH_CONFIGURED ? supaKey : null;