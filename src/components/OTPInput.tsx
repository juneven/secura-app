import { useRef } from 'react';
import { Pressable, StyleSheet, Text, TextInput, TextInputInstance, View } from 'react-native';
import { Colors } from '@/constants/colors';

type Props = {
  value: string[];
  onChange: (next: string[]) => void;
  length?: number;
  editable?: boolean;
};

// TextInput tersembunyi menangkap angka (tempel & isi otomatis)
export default function OTPInput({ value, onChange, length = 6, editable = true }: Props) {
  const inputRef = useRef<TextInputInstance>(null);
  const code = value.join('');

  const onChangeText = (text: string) => {
    const digits = text.replace(/\D/g, '').slice(0, length);
    onChange(Array.from({ length }, (_, i) => digits[i] ?? ''));
  };

  return (
    <Pressable style={styles.row} onPress={() => inputRef.current?.focus()} accessibilityLabel={`Kode ${length} digit`}>
      {Array.from({ length }, (_, i) => {
        const active = editable && i === Math.min(code.length, length - 1);
        return (
          <View key={i} style={[styles.box, active && styles.active]}>
            <Text style={styles.digit}>{value[i] ?? ''}</Text>
          </View>
        );
      })}
      <TextInput
        ref={inputRef}
        value={code}
        onChangeText={onChangeText}
        editable={editable}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete="one-time-code"
        maxLength={length}
        autoFocus
        caretHidden
        style={styles.hidden}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'center', gap: 8, width: '100%' },
  box: {
    width: 46, height: 56, borderRadius: 12, borderWidth: 1, borderColor: Colors.border,
    backgroundColor: Colors.white, alignItems: 'center', justifyContent: 'center',
  },
  active: { borderColor: Colors.primary, borderWidth: 2 },
  digit: { fontSize: 22, fontWeight: '700', color: Colors.textPrimary },
  hidden: { position: 'absolute', width: '100%', height: '100%', opacity: 0 },
});
