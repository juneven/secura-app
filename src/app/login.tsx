import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AuthScreen from '@/components/AuthScreen';
import AuthHeader from '@/components/AuthHeader';
import AuthInput from '@/components/AuthInput';
import FormMessage from '@/components/FormMessage';
import PrimaryButton from '@/components/PrimaryButton';
import SocialLoginButtons from '@/components/SocialLoginButtons';
import IllustrationPlaceholder from '@/components/IllustrationPlaceholder';
import { Colors } from '@/constants/colors';
import { login } from '@/services/auth';
import { session, showLoggedInNotice } from '@/services/session';
import { validateEmail } from '@/utils/validation';

export default function LoginScreen() {
  const router = useRouter();
  const { verified } = useLocalSearchParams<{ verified?: string }>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [formError, setFormError] = useState<string>();
  const [needsVerify, setNeedsVerify] = useState(false);
  const [loading, setLoading] = useState(false);

  // Berhasil hanya jika server memberi token
  const onLogin = async () => {
    const e = { email: validateEmail(email), password: password ? undefined : 'Password wajib diisi' };
    setErrors(e);
    setFormError(undefined);
    setNeedsVerify(false);
    if (e.email || e.password) return;

    setLoading(true);
    const result = await login({ email: email.trim(), password });
    setLoading(false);

    if (result.ok) {
      session.setAccessToken(result.data);
      showLoggedInNotice();
      return;
    }
    setFormError(result.error.message);
    setNeedsVerify(result.error.code === 'EMAIL_NOT_VERIFIED');
  };

  // Kode baru diminta lewat Resend
  const goVerify = () =>
    router.push({ pathname: '/otp-verification', params: { email: email.trim(), purpose: 'signup', sent: '0' } });

  return (
    <AuthScreen>
      <IllustrationPlaceholder name="loginHero" size={150} />
      <AuthHeader title="Welcome!" subtitle="Login to Continue" />
      {verified === '1' ? <FormMessage kind="success" text="Email berhasil diverifikasi. Silakan login." /> : null}
      <AuthInput leftIcon="mailIcon" placeholder="youremail@mail.com" keyboardType="email-address"
        value={email} onChangeText={setEmail} error={errors.email} textContentType="emailAddress" />
      <AuthInput leftIcon="lockIcon" placeholder="your password" isPassword
        value={password} onChangeText={setPassword} error={errors.password} textContentType="password" />
      <Pressable onPress={() => router.push('/forgot-password')} style={styles.forgot} hitSlop={8}>
        <Text style={styles.link}>Forgot Password?</Text>
      </Pressable>
      <FormMessage kind="error" text={formError} />
      {needsVerify ? (
        <Pressable onPress={goVerify} hitSlop={8} style={styles.verify}>
          <Text style={styles.linkBold}>Verifikasi email sekarang</Text>
        </Pressable>
      ) : null}
      <PrimaryButton title="Login" onPress={onLogin} loading={loading} />
      <SocialLoginButtons onAuthenticated={showLoggedInNotice} />
      <View style={styles.footer}>
        <Text style={styles.muted}>{"Don't have an account? "}</Text>
        <Pressable onPress={() => router.push('/signup')} hitSlop={8}>
          <Text style={styles.linkBold}>Sign Up</Text>
        </Pressable>
      </View>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  forgot: { alignSelf: 'flex-end', marginBottom: 16, marginTop: 2 },
  verify: { marginBottom: 14 },
  link: { fontSize: 12, color: Colors.textPrimary, fontWeight: '600' },
  footer: { flexDirection: 'row', marginTop: 22, alignItems: 'center' },
  muted: { fontSize: 12, color: Colors.textSecondary },
  linkBold: { fontSize: 12, color: Colors.primary, fontWeight: '700' },
});
