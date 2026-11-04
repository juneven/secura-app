import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Easing, LayoutChangeEvent, Pressable, StyleSheet, Text, View } from 'react-native';
import PrimaryButton from './PrimaryButton';
import { Colors } from '@/constants/colors';

export type LoadingState = 'loading' | 'slow' | 'error' | 'success';

type Props = {
  state: LoadingState;
  message?: string;
  onRetry?: () => void;
  // Hanya isi jika progres benar-benar terukur (0..1)
  progress?: number;
  // light: latar biru, dark: latar terang
  tone?: 'light' | 'dark';
  secondaryAction?: { label: string; onPress: () => void };
};

const DEFAULT_MESSAGE: Record<LoadingState, string> = {
  loading: 'Loading...',
  slow: 'Koneksi lambat, mohon tunggu...',
  error: 'Gagal memuat.',
  success: '',
};

// Bar tanpa persentase, hanya penanda sedang bekerja
export function IndeterminateBar({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const [trackW, setTrackW] = useState(0);
  const x = useRef(new Animated.Value(0)).current;
  const segW = trackW * 0.35;

  useEffect(() => {
    if (!trackW) return;
    x.setValue(-segW);
    const loop = Animated.loop(
      Animated.timing(x, { toValue: trackW, duration: 1100, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
    );
    loop.start();
    return () => loop.stop();
  }, [trackW, segW, x]);

  const light = tone === 'light';
  return (
    <View
      style={[styles.track, { backgroundColor: light ? 'rgba(255,255,255,0.35)' : Colors.secondary }]}
      onLayout={(e: LayoutChangeEvent) => setTrackW(e.nativeEvent.layout.width)}
      accessibilityRole="progressbar"
    >
      <Animated.View
        style={{ width: segW, height: '100%', borderRadius: 4, backgroundColor: light ? Colors.white : Colors.primary, transform: [{ translateX: x }] }}
      />
    </View>
  );
}

export default function LoadingIndicator({ state, message, onRetry, progress, tone = 'dark', secondaryAction }: Props) {
  if (state === 'success') return null;
  const color = tone === 'light' ? Colors.white : Colors.textPrimary;
  const text = message ?? DEFAULT_MESSAGE[state];

  return (
    <View style={styles.wrap} accessibilityLiveRegion="polite">
      {state === 'error' ? null : progress != null ? (
        <View style={[styles.track, { backgroundColor: tone === 'light' ? 'rgba(255,255,255,0.35)' : Colors.secondary }]}>
          <View style={{ width: `${Math.round(Math.min(Math.max(progress, 0), 1) * 100)}%`, height: '100%', borderRadius: 4, backgroundColor: tone === 'light' ? Colors.white : Colors.primary }} />
        </View>
      ) : (
        <ActivityIndicator size="large" color={tone === 'light' ? Colors.white : Colors.primary} />
      )}
      {text ? <Text style={[styles.text, { color }]}>{text}</Text> : null}
      {state === 'error' && onRetry ? <PrimaryButton title="Coba Lagi" onPress={onRetry} style={styles.retry} /> : null}
      {state === 'error' && secondaryAction ? (
        <Pressable onPress={secondaryAction.onPress} hitSlop={10} accessibilityRole="button" style={styles.secondary}>
          <Text style={[styles.secondaryText, { color }]}>{secondaryAction.label}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', width: '100%' },
  text: { marginTop: 12, fontSize: 14, textAlign: 'center' },
  retry: { marginTop: 16, maxWidth: 220 },
  secondary: { marginTop: 14 },
  secondaryText: { fontSize: 13, fontWeight: '600', textDecorationLine: 'underline' },
  track: { width: '80%', maxWidth: 320, height: 8, borderRadius: 4, overflow: 'hidden' },
});
