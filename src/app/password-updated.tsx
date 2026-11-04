import { Redirect, useRouter } from 'expo-router';
import AuthScreen from '@/components/AuthScreen';
import AuthHeader from '@/components/AuthHeader';
import PrimaryButton from '@/components/PrimaryButton';
import IllustrationPlaceholder from '@/components/IllustrationPlaceholder';
import { session } from '@/services/session';

export default function PasswordUpdatedScreen() {
  const router = useRouter();

  // Hanya valid setelah server mengonfirmasi perubahan
  if (!session.wasPasswordUpdated()) return <Redirect href="/login" />;

  const backToLogin = () => {
    session.clearPasswordUpdated();
    router.replace('/login');
  };

  return (
    <AuthScreen>
      <IllustrationPlaceholder name="successHero" size={170} />
      <AuthHeader title="Password Updated!" subtitle="Your password has been changed. You can now log in with your new password." />
      <PrimaryButton title="Back to Login" onPress={backToLogin} style={{ marginTop: 16 }} />
    </AuthScreen>
  );
}
