import { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import AuthScreen from '@/components/AuthScreen';
import AuthHeader from '@/components/AuthHeader';
import AuthInput from '@/components/AuthInput';
import FormMessage from '@/components/FormMessage';
import PrimaryButton from '@/components/PrimaryButton';
import IllustrationPlaceholder from '@/components/IllustrationPlaceholder';
import { Colors } from '@/constants/colors';
import { resetPassword } from '@/services/auth';
import { session } from '@/services/session';
import { validateConfirm, validatePassword } from '@/utils/validation';

export default function ResetPasswordScreen() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState<{ password?: string; confirm?: string }>({});
  const [formError, setFormError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const hasToken = session.getResetToken() !== null;

  // Halaman sukses hanya jika server mengonfirmasi
  const onReset = async () => {
    const resetToken = session.getResetToken();
    if (!resetToken) return;
    const e = { password: validatePassword(password), confirm: validateConfirm(password, confirm) };
    setErrors(e);
    setFormError(undefined);
    if (e.password || e.confirm) return;

    setLoading(true);
    const result = await resetPassword({ resetToken, newPassword: password });
    setLoading(false);

    if (!result.ok) {
      setFormError(result.error.message);
      return;
    }
    session.clearResetToken();
    session.markPasswordUpdated();
    router.replace('/password-updated');
  };

  // Tanpa token reset, halaman ini tidak boleh dipakai
  if (!hasToken) {
    return (
      <AuthScreen>
        <IllustrationPlaceholder name="resetHero" size={150} />
        <AuthHeader title="Reset Password" />
        <FormMessage kind="error" text="Sesi reset password tidak ditemukan. Mulai lagi dari Forgot Password." />
        <PrimaryButton title="Forgot Password" onPress={() => router.replace('/forgot-password')} />
      </AuthScreen>
    );
  }

  return (
    <AuthScreen>
      <IllustrationPlaceholder name="resetHero" size={150} />
      <AuthHeader title="Reset Password" subtitle="Create a new password for your account" />
      <AuthInput leftIcon="lockIcon" placeholder="your password" isPassword value={password}
        onChangeText={setPassword} error={errors.password} textContentType="newPassword" />
      <AuthInput leftIcon="lockIcon" placeholder="confirm password" isPassword value={confirm}
        onChangeText={setConfirm} error={errors.confirm} textContentType="newPassword" />
      <FormMessage kind="error" text={formError} />
      <PrimaryButton title="Reset Password" onPress={onReset} loading={loading} style={styles.submit} />
      <Pressable onPress={() => router.replace('/forgot-password')} hitSlop={8} style={styles.back}>
        <Text style={styles.link}>Start over</Text>
      </Pressable>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  submit: { marginTop: 4 },
  back: { marginTop: 22 },
  link: { fontSize: 13, fontWeight: '700', color: Colors.primary },
});
