import React, { useCallback } from 'react';
import { useRouter } from 'expo-router';
import LoadingScreen from '@/screens/LoadingScreen';
import { runStartup } from '@/services/startup';

export default function Index() {
  const router = useRouter();

  const onDone = useCallback(() => {
    router.replace('/login');
  }, [router]);

  return (
    <LoadingScreen
      task={runStartup}
      onDone={onDone}
    />
  );
}