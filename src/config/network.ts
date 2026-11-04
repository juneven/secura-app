import { API_BASE_URL, AUTH_API_KEY, AUTH_BASE_URL, ENDPOINTS } from '@/config/api';

// Pengaturan pengecekan koneksi saat startup
const probe = (process.env.EXPO_PUBLIC_INTERNET_PROBE_URL ?? '').trim();

export const NETWORK_CONFIG: {
  internetProbeUrl: string | null;
  apiHealthUrl: string | null;
  apiHealthHeaders: Record<string, string> | undefined;
  probeTimeoutMs: number;
  slowAfterMs: number;
} = {
  internetProbeUrl: probe.startsWith('https://') ? probe : null,
  // Cek server: backend lama dulu, lalu Supabase
  apiHealthUrl: API_BASE_URL ? `${API_BASE_URL}${ENDPOINTS.health}` : AUTH_BASE_URL ? `${AUTH_BASE_URL}/health` : null,
  apiHealthHeaders: !API_BASE_URL && AUTH_API_KEY ? { apikey: AUTH_API_KEY } : undefined,
  probeTimeoutMs: 5000,
  slowAfterMs: 3000,
};
