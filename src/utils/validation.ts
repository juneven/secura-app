// Validasi hanya untuk kenyamanan; server tetap memvalidasi

export const PASSWORD_MIN_LENGTH = 8;

export function validateUsername(value: string): string | undefined {
  const v = value.trim();
  if (!v) return 'Username wajib diisi';
  if (v.length < 3) return 'Username minimal 3 karakter';
  if (v.length > 30) return 'Username maksimal 30 karakter';
  if (!/^[A-Za-z0-9_.]+$/.test(v)) return 'Username hanya boleh huruf, angka, titik, dan garis bawah';
  return undefined;
}

export function validateEmail(value: string): string | undefined {
  const v = value.trim();
  if (!v) return 'Email wajib diisi';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Format email tidak valid';
  return undefined;
}

export function validatePassword(value: string): string | undefined {
  if (!value) return 'Password wajib diisi';
  if (value.length < PASSWORD_MIN_LENGTH) return `Password minimal ${PASSWORD_MIN_LENGTH} karakter`;
  if (!/[A-Za-z]/.test(value) || !/[0-9]/.test(value)) return 'Password harus mengandung huruf dan angka';
  return undefined;
}

export function validateConfirm(password: string, confirm: string): string | undefined {
  if (!confirm) return 'Konfirmasi password wajib diisi';
  if (password !== confirm) return 'Konfirmasi password tidak sama';
  return undefined;
}

export function validateCode(code: string, length: number): string | undefined {
  if (!code) return 'Kode wajib diisi';
  if (!/^\d+$/.test(code) || code.length < length) return `Masukkan ${length} digit kode`;
  return undefined;
}
