import { ENDPOINTS } from '@/config/api';
import { apiPost, authRequest, type ApiError, isRecord } from '@/services/api';

export type AuthResult<T> = { ok: true; data: T } | { ok: false; error: ApiError };

const bad = (message: string): AuthResult<never> => ({ ok: false, error: { kind: 'bad-response', message } });

const tokenOf = (body: unknown): string | null =>
  isRecord(body) && typeof body.access_token === 'string' && body.access_token ? body.access_token : null;

async function endServerSession(token: string): Promise<void> {
  await authRequest('POST', '/logout', undefined, token);
}

// Supabase mengirim kode verifikasi ke email
export async function register(p: { username: string; email: string; password: string }): Promise<AuthResult<true>> {
  const res = await authRequest('POST', '/signup', { email: p.email, password: p.password, data: { username: p.username } });
  if (!res.ok) return res;
  if (!isRecord(res.data)) return bad('Server tidak mengonfirmasi pendaftaran. Coba lagi.');
  // Dapat sesi = "Confirm email" mati di Supabase
  const token = tokenOf(res.data);
  if (token) {
    await endServerSession(token);
    return bad('Verifikasi email belum aktif di Supabase (Authentication > Sign In / Providers > Email > Confirm email).');
  }
  // identities kosong = email sudah terdaftar, tanpa email
  if (Array.isArray(res.data.identities) && res.data.identities.length === 0) {
    return {
      ok: false,
      error: { kind: 'http', code: 'EMAIL_TAKEN', message: 'Email ini sudah terdaftar. Silakan login, atau pakai Forgot Password jika lupa password.' },
    };
  }
  return { ok: true, data: true };
}

export async function resendVerification(p: { email: string }): Promise<AuthResult<true>> {
  const res = await authRequest('POST', '/resend', { type: 'signup', email: p.email });
  return res.ok ? { ok: true, data: true } : res;
}

export async function verifyEmail(p: { email: string; code: string }): Promise<AuthResult<true>> {
  const res = await authRequest('POST', '/verify', { type: 'email', email: p.email, token: p.code });
  if (!res.ok) return res;
  const token = tokenOf(res.data);
  if (!token) return bad('Server tidak mengonfirmasi verifikasi. Coba lagi.');
  await endServerSession(token); // lanjut ke Login
  return { ok: true, data: true };
}

export async function login(p: { email: string; password: string }): Promise<AuthResult<string>> {
  const res = await authRequest('POST', '/token?grant_type=password', { email: p.email, password: p.password });
  if (!res.ok) return res;
  const token = tokenOf(res.data);
  return token ? { ok: true, data: token } : bad('Respons login dari server tidak valid.');
}

// Respons sama untuk email terdaftar maupun tidak
export async function forgotPassword(p: { email: string }): Promise<AuthResult<true>> {
  const res = await authRequest('POST', '/recover', { email: p.email });
  return res.ok ? { ok: true, data: true } : res;
}

// Hasilnya token pemulihan untuk langkah berikutnya
export async function verifyResetCode(p: { email: string; code: string }): Promise<AuthResult<string>> {
  const res = await authRequest('POST', '/verify', { type: 'recovery', email: p.email, token: p.code });
  if (!res.ok) return res;
  const token = tokenOf(res.data);
  return token ? { ok: true, data: token } : bad('Respons verifikasi dari server tidak valid.');
}

// Butuh token dari verifyResetCode; sesi ditutup setelahnya
export async function resetPassword(p: { resetToken: string; newPassword: string }): Promise<AuthResult<true>> {
  const res = await authRequest('PUT', '/user', { password: p.newPassword }, p.resetToken);
  if (!res.ok) return res;
  if (!isRecord(res.data)) return bad('Server tidak mengonfirmasi perubahan password.');
  await endServerSession(p.resetToken);
  return { ok: true, data: true };
}

// Login sosial lewat backend lama
async function callCustomApi<T>(path: string, payload: unknown, parse: (body: unknown) => T | null, missing: string): Promise<AuthResult<T>> {
  const res = await apiPost(path, payload);
  if (!res.ok) return res;
  const data = parse(res.data);
  return data === null ? bad(missing) : { ok: true, data };
}

// Tukar kode login sosial dengan token
export const exchangeSocialCode = (p: { provider: 'google' | 'apple'; code: string }) =>
  callCustomApi(ENDPOINTS.socialExchange, p, tokenOf, 'Respons login sosial dari server tidak valid.');