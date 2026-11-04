import { ActivityIndicator, Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { Colors } from '@/constants/colors';

type Props = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'solid' | 'outline';
  style?: StyleProp<ViewStyle>;
};

// Dinonaktifkan saat loading agar tidak terkirim dua kali
export default function PrimaryButton({ title, onPress, loading = false, disabled = false, variant = 'solid', style }: Props) {
  const inactive = disabled || loading;
  const solid = variant === 'solid';
  return (
    <Pressable
      onPress={onPress}
      disabled={inactive}
      accessibilityRole="button"
      accessibilityState={{ disabled: inactive, busy: loading }}
      style={({ pressed }) => [
        styles.base,
        solid ? styles.solid : styles.outline,
        inactive && styles.inactive,
        pressed && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={solid ? Colors.white : Colors.primary} />
      ) : (
        <Text style={[styles.text, { color: solid ? Colors.white : Colors.primary }]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { width: '100%', minHeight: 52, borderRadius: 14, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
  solid: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary, shadowOpacity: 0.3, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 3,
  },
  outline: { backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border },
  inactive: { opacity: 0.6 },
  pressed: { opacity: 0.85 },
  text: { fontSize: 16, fontWeight: '700' },
});
