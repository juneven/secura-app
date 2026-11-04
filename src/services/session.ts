import { Alert } from 'react-native';

// Hanya di memori; jangan simpan token di AsyncStorage/log
let accessToken: string | null = null;
let resetToken: string | null = null;
let passwordUpdated = false;

export const session = {
  setAccessToken(token: string) {
    accessToken = token;
  },
  hasSession: () => accessToken !== null,
  clear() {
    accessToken = null;
  },

  // Token singkat untuk langkah reset password
  setResetToken(token: string) {
    resetToken = token;
  },
  getResetToken: () => resetToken,
  clearResetToken() {
    resetToken = null;
  },

  // Penanda password baru saja diubah
  markPasswordUpdated() {
    passwordUpdated = true;
  },
  wasPasswordUpdated: () => passwordUpdated,
  clearPasswordUpdated() {
    passwordUpdated = false;
  },
};

// Halaman utama belum ada; login hanya diberi notifikasi
export function showLoggedInNotice() {
  Alert.alert('Login berhasil', 'Server mengonfirmasi login. Halaman utama aplikasi belum dibuat.');
}
