import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AuthScreen from '@/components/AuthScreen';
import AuthHeader from '@/components/AuthHeader';
import FormMessage from '@/components/FormMessage';
import OTPInput from '@/components/OTPInput';
import PrimaryButton from '@/components/PrimaryButton';
import IllustrationPlaceholder from '@/components/IllustrationPlaceholder';
import { Colors } from '@/constants/colors';
import { forgotPassword, resendVerification, verifyEmail, verifyResetCode } from '@/services/auth';
import { session } from '@/services/session';
import { validateCode } from '@/utils/validation';

const OTP_LENGTH = 6;
const COUNTDOWN = 60;
const emptyCode = () => Array<string>(OTP_LENGTH).fill('');

// Dipakai dua alur: signup dan reset password
export default function OtpVerificationScreen() {
  const router = useRouter();
  const { email, purpose, sent } = useLocalSearchParams<{ email?: string; purpose?: string; sent?: string }>();
  const isReset = purpose === 'reset';

  const [code, setCode] = useState<string[]>(emptyCode);
  // Hitung mundur berbasis jam, hanya jalan jika sent=1
  const [endAt, setEndAt] = useState<number | null>(sent === '1' ? Date.now() + COUNTDOWN * 1000 : null);
  const [now, setNow] = useState(Date.now());
  const seconds = endAt === null ? 0 : Math.max(0, Math.ceil((endAt - now) / 1000));
  const startCountdown = (s: number) => {
    setNow(Date.now());
    setEndAt(Date.now() + s * 1000);
  };
  const [error, setError] = useState<string>();
  const [info, setInfo] = useState<string>();
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (endAt === null) return;
    const timer = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(timer);
  }, [endAt]);

  const onVerify = async () => {
    if (!email) return;
    const codeText = code.join('');
    const invalid = validateCode(codeText, OTP_LENGTH);
    setInfo(undefined);
    setError(invalid);
    if (invalid) return;

    setVerifying(true);
    if (isReset) {
      const result = await verifyResetCode({ email, code: codeText });
      setVerifying(false);
      if (!result.ok) return handleFailure(result.error.code, result.error.message);
      session.setResetToken(result.data);
      router.replace('/reset-password');
    } else {
      const result = await verifyEmail({ email, code: codeText });
      setVerifying(false);
      if (!result.ok) return handleFailure(result.error.code, result.error.message);
      router.replace({ pathname: '/login', params: { verified: '1' } });
    }
  };

  // Kode kedaluwarsa: boleh kirim ulang tanpa menunggu
  const handleFailure = (errorCode: string | undefined, message: string) => {
    setError(message);
    if (errorCode === 'CODE_EXPIRED') setEndAt(null);
  };

  // Pesan sukses hanya jika server mengonfirmasi
  const onResend = async () => {
    if (!email) return;
    setError(undefined);
    setInfo(undefined);
    setResending(true);
    const result = isReset ? await forgotPassword({ email }) : await resendVerification({ email });
    setResending(false);
    if (!result.ok) {
      setError(result.error.message);
      if (result.error.retryAfter) startCountdown(result.error.retryAfter);
      return;
    }
    setCode(emptyCode());
    startCountdown(COUNTDOWN);
    setInfo('Kode baru telah dikirim ke email Anda.');
  };

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');
  const busy = verifying || resending;

  return (
    <AuthScreen>
      <IllustrationPlaceholder name="otpHero" size={150} />
      <AuthHeader
        title="Verify OTP"
        subtitle={email ? `Enter the ${OTP_LENGTH}-digit code sent to\n${email}` : `Enter the ${OTP_LENGTH}-digit verification code`}
      />
      {!email ? (
        <FormMessage kind="error" text="Email tidak ditemukan. Ulangi dari halaman sebelumnya." />
      ) : null}
      <OTPInput value={code} onChange={setCode} length={OTP_LENGTH} editable={!busy && !!email} />
      <View style={styles.messages}>
        <FormMessage kind="error" text={error} />
        <FormMessage kind="success" text={info} />
      </View>
      <View style={styles.resendRow}>
        {seconds > 0 ? (
          <Text style={styles.timer}>{`Resend code in ${mm}:${ss}`}</Text>
        ) : (
          <Pressable onPress={onResend} disabled={busy || !email} hitSlop={8}>
            <Text style={[styles.linkBold, busy && styles.dim]}>{resending ? 'Sending...' : 'Resend code'}</Text>
          </Pressable>
        )}
      </View>
      <PrimaryButton title="Verify" onPress={onVerify} loading={verifying} disabled={!email || resending} />
      <Pressable onPress={() => (router.canGoBack() ? router.back() : router.replace('/login'))} hitSlop={8} style={styles.back}>
        <Text style={styles.linkBold}>Back</Text>
      </Pressable>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  messages: { width: '100%', marginTop: 14 },
  resendRow: { marginVertical: 20 },
  timer: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
  linkBold: { fontSize: 14, fontWeight: '700', color: Colors.primary },
  dim: { opacity: 0.5 },
  back: { marginTop: 22 },
});