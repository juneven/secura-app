import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FormMessage from './FormMessage';
import PrimaryButton from './PrimaryButton';
import { Colors } from '@/constants/colors';
import { session } from '@/services/session';
import { SocialProvider, signInWithProvider } from '@/services/socialAuth';

// Sukses hanya jika Supabase menerbitkan access token
export default function SocialLoginButtons({ onAuthenticated }: { onAuthenticated: () => void }) {
  const [busy, setBusy] = useState<SocialProvider | null>(null);
  const [error, setError] = useState<string>();

  const run = async (provider: SocialProvider) => {
    setError(undefined);
    setBusy(provider);
    const result = await signInWithProvider(provider);
    setBusy(null);
    if (result.status === 'success') {
      session.setAccessToken(result.accessToken);
      onAuthenticated();
    } else if (result.status === 'error') {
      setError(result.message);
    } // cancelled: pengguna menutup sendiri
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.or}>or</Text>
        <View style={styles.line} />
      </View>
      <FormMessage kind="error" text={error} />
      <PrimaryButton title="Continue with Google" variant="outline" loading={busy === 'google'} disabled={busy !== null} onPress={() => run('google')} style={styles.btn} />
      <PrimaryButton title="Continue with Apple" variant="outline" loading={busy === 'apple'} disabled={busy !== null} onPress={() => run('apple')} style={styles.btn} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: '100%', marginTop: 20 },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  line: { flex: 1, height: 1, backgroundColor: Colors.border },
  or: { fontSize: 12, color: Colors.textSecondary },
  btn: { marginBottom: 10 },
});
