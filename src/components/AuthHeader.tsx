import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/constants/colors';

export default function AuthHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title} accessibilityRole="header">{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', marginTop: 12, marginBottom: 24 },
  title: { fontSize: 28, fontWeight: '700', color: Colors.textPrimary, textAlign: 'center' },
  subtitle: { marginTop: 8, fontSize: 14, lineHeight: 20, color: Colors.textSecondary, textAlign: 'center' },
});
