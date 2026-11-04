import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import IllustrationPlaceholder from '@/components/IllustrationPlaceholder';
import AppIcon, { hasAsset } from '@/components/AppIcon';
import LoadingIndicator, { IndeterminateBar } from '@/components/LoadingIndicator';
import { NETWORK_CONFIG } from '@/config/network';
import { Colors } from '@/constants/colors';
import type { StartupOutcome } from '@/services/startup';

type Props = {
  // signal dibatalkan saat layar ditutup atau diulang
  task: (signal: AbortSignal) => Promise<StartupOutcome>;
  onDone: () => void;
};

type ViewState = { kind: 'running'; slow: boolean } | { kind: 'blocked'; message: string } | { kind: 'failed' };

// Tampil selama task berjalan; tanpa durasi buatan
export default function LoadingScreen({ task, onDone }: Props) {
  const [view, setView] = useState<ViewState>({ kind: 'running', slow: false });
  const taskRef = useRef(task);
  const doneRef = useRef(onDone);
  taskRef.current = task;
  doneRef.current = onDone;
  const runId = useRef(0);
  const abortRef = useRef<AbortController | null>(null);

  const start = useCallback(async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const id = ++runId.current;
    setView({ kind: 'running', slow: false });

    const slowTimer = setTimeout(() => {
      if (id === runId.current) setView((v) => (v.kind === 'running' ? { kind: 'running', slow: true } : v));
    }, NETWORK_CONFIG.slowAfterMs);

    try {
      const outcome = await taskRef.current(controller.signal);
      if (id !== runId.current) return; // abaikan hasil lama
      if (outcome.status === 'ready') doneRef.current();
      else if (outcome.status === 'blocked') setView({ kind: 'blocked', message: outcome.message });
    } catch {
      if (id === runId.current) setView({ kind: 'failed' });
    } finally {
      clearTimeout(slowTimer);
    }
  }, []);

  useEffect(() => {
    void start();
    return () => {
      runId.current++;
      abortRef.current?.abort();
    };
  }, [start]);

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <View style={styles.glowA} />
      <View style={styles.glowB} />
      <View style={styles.center}>
        <IllustrationPlaceholder name="welcomeHero" size={170} />
        <Text style={styles.title}>{'Welcome To\nSecura!'}</Text>
        {view.kind === 'running' ? (
          <>
            <IndeterminateBar tone="light" />
            {view.slow ? <Text style={styles.slow}>Pengecekan koneksi lebih lama dari biasanya...</Text> : null}
          </>
        ) : view.kind === 'blocked' ? (
          <LoadingIndicator
            state="error"
            tone="light"
            message={view.message}
            onRetry={start}
            secondaryAction={{ label: 'Lanjutkan tanpa pengecekan', onPress: () => doneRef.current() }}
          />
        ) : (
          <LoadingIndicator state="error" tone="light" message="Gagal memulai aplikasi." onRetry={start} />
        )}
      </View>
      <View style={styles.logoWrap}>
        {hasAsset('logo') ? <AppIcon name="logo" size={150} /> : <Text style={styles.logoText}>SECURA</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.primary },
  glowA: { position: 'absolute', top: -100, left: -80, width: 360, height: 360, borderRadius: 180, backgroundColor: Colors.secondary, opacity: 0.45 },
  glowB: { position: 'absolute', bottom: -140, right: -100, width: 380, height: 380, borderRadius: 190, backgroundColor: '#5B9BEA', opacity: 0.4 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 },
  title: { marginTop: 24, marginBottom: 24, fontSize: 30, fontWeight: '700', color: Colors.white, textAlign: 'center', lineHeight: 38 },
  slow: { marginTop: 14, fontSize: 13, color: Colors.white, textAlign: 'center' },
  logoWrap: { alignItems: 'center', paddingBottom: 48 },
  logoText: { color: Colors.white, fontSize: 22, fontWeight: '800', letterSpacing: 4 },
});
