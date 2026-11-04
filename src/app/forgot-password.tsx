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
import { forgotPassword } from '@/services/auth';
import { validateEmail } from '@/utils/validation';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string>();
  const [formError, setFormError] = useState<string>();
  const [loading, setLoading] = useState(false);

  // Lanjut hanya jika server mengonfirmasi
  const onSend = async () => {
    const e = validateEmail(email);
    setError(e);
    setFormError(undefined);
    if (e) return;

    setLoading(true);
    const result = await forgotPassword({ email: email.trim() });
    setLoading(false);

    if (!result.ok) {
      setFormError(result.error.message);
      return;
    }
    router.push({ pathname: '/otp-verification', params: { email: email.trim(), purpose: 'reset', sent: '1' } });
  };

  return (
    <AuthScreen>
      <IllustrationPlaceholder name="forgotHero" size={150} />
      <AuthHeader title="Forgot Password?" subtitle="Enter your email and we'll send you a code to reset your password" />
      <AuthInput leftIcon="mailIcon" placeholder="youremail@mail.com" keyboardType="email-address"
        value={email} onChangeText={setEmail} error={error} textContentType="emailAddress" />
      <FormMessage kind="error" text={formError} />
      <PrimaryButton title="Send Code" onPress={onSend} loading={loading} style={styles.submit} />
      <Pressable onPress={() => (router.canGoBack() ? router.back() : router.replace('/login'))} hitSlop={8} style={styles.back}>
        <Text style={styles.link}>Back to Login</Text>
      </Pressable>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  submit: { marginTop: 4 },
  back: { marginTop: 22 },
  link: { fontSize: 13, fontWeight: '700', color: Colors.primary },
});
