import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import AuthScreen from '@/components/AuthScreen';
import AuthHeader from '@/components/AuthHeader';
import AuthInput from '@/components/AuthInput';
import FormMessage from '@/components/FormMessage';
import PrimaryButton from '@/components/PrimaryButton';
import SocialLoginButtons from '@/components/SocialLoginButtons';
import IllustrationPlaceholder from '@/components/IllustrationPlaceholder';
import { Colors } from '@/constants/colors';
import { register } from '@/services/auth';
import { showLoggedInNotice } from '@/services/session';
import { validateConfirm, validateEmail, validatePassword, validateUsername } from '@/utils/validation';

type Errors = { username?: string; email?: string; password?: string; confirm?: string };

export default function SignUpScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string>();
  const [loading, setLoading] = useState(false);

  // Lanjut ke halaman kode hanya jika server mengonfirmasi
  const onSubmit = async () => {
    const e: Errors = {
      username: validateUsername(username),
      email: validateEmail(email),
      password: validatePassword(password),
      confirm: validateConfirm(password, confirm),
    };
    setErrors(e);
    setFormError(undefined);
    if (e.username || e.email || e.password || e.confirm) return;

    setLoading(true);
    const result = await register({ username: username.trim(), email: email.trim(), password });
    setLoading(false);

    if (!result.ok) {
      setFormError(result.error.message);
      return;
    }
    router.push({ pathname: '/otp-verification', params: { email: email.trim(), purpose: 'signup', sent: '1' } });
  };

  return (
    <AuthScreen>
      <IllustrationPlaceholder name="signupHero" size={130} />
      <AuthHeader title="Create Account" subtitle="Start your journey with Secura" />
      <AuthInput leftIcon="userIcon" placeholder="your username" value={username}
        onChangeText={setUsername} error={errors.username} textContentType="username" />
      <AuthInput leftIcon="mailIcon" placeholder="youremail@gmail.com" keyboardType="email-address"
        value={email} onChangeText={setEmail} error={errors.email} textContentType="emailAddress" />
      <AuthInput leftIcon="lockIcon" placeholder="your password" isPassword value={password}
        onChangeText={setPassword} error={errors.password} textContentType="newPassword" />
      <AuthInput leftIcon="lockIcon" placeholder="confirm password" isPassword value={confirm}
        onChangeText={setConfirm} error={errors.confirm} textContentType="newPassword" />
      <FormMessage kind="error" text={formError} />
      <PrimaryButton title="Sign Up" onPress={onSubmit} loading={loading} style={styles.submit} />
      <SocialLoginButtons onAuthenticated={showLoggedInNotice} />
      <View style={styles.footer}>
        <Text style={styles.muted}>Already have an account? </Text>
        <Pressable onPress={() => router.replace('/login')} hitSlop={8}>
          <Text style={styles.linkBold}>Login</Text>
        </Pressable>
      </View>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  submit: { marginTop: 4 },
  footer: { flexDirection: 'row', marginTop: 22, alignItems: 'center' },
  muted: { fontSize: 12, color: Colors.textSecondary },
  linkBold: { fontSize: 12, color: Colors.primary, fontWeight: '700' },
});
