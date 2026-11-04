import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/constants/colors';

type Props = { kind: 'error' | 'success' | 'info'; text?: string | null };

export default function FormMessage({ kind, text }: Props) {
  if (!text) return null;
  const color = kind === 'error' ? Colors.error : kind === 'success' ? Colors.success : Colors.textSecondary;
  return (
    <View style={[styles.box, { borderColor: color }]} accessibilityLiveRegion="polite" accessibilityRole={kind === 'error' ? 'alert' : undefined}>
      <Text style={[styles.text, { color }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { width: '100%', borderWidth: 1, borderRadius: 12, paddingVertical: 10, paddingHorizontal: 12, marginBottom: 14, backgroundColor: Colors.white },
  text: { fontSize: 13, lineHeight: 18, textAlign: 'center' },
});
