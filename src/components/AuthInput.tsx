import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import FieldIcon, { FieldIconName } from './FieldIcon';
import { Colors } from '@/constants/colors';

type Props = Pick<TextInputProps, 'placeholder' | 'value' | 'onChangeText' | 'keyboardType' | 'textContentType' | 'editable'> & {
  leftIcon?: FieldIconName;
  isPassword?: boolean;
  error?: string;
};

export default function AuthInput({ leftIcon, isPassword = false, error, keyboardType, ...rest }: Props) {
  const [hidden, setHidden] = useState(true);
  const [focused, setFocused] = useState(false);
  const iconColor = error ? Colors.error : focused ? Colors.primary : Colors.textSecondary;

  return (
    <View style={styles.wrap}>
      <View style={[styles.field, focused && styles.focused, error ? styles.errorBorder : null]}>
        {leftIcon ? <FieldIcon name={leftIcon} color={iconColor} /> : null}
        <TextInput
          {...rest}
          style={styles.input}
          placeholderTextColor={Colors.textSecondary}
          secureTextEntry={isPassword && hidden}
          keyboardType={keyboardType}
          autoCapitalize="none"
          autoCorrect={false}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {isPassword ? (
          <Pressable onPress={() => setHidden((h) => !h)} hitSlop={10} accessibilityRole="button" accessibilityLabel={hidden ? 'Tampilkan password' : 'Sembunyikan password'}>
            <Text style={styles.toggle}>{hidden ? 'Show' : 'Hide'}</Text>
          </Pressable>
        ) : null}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: '100%', marginBottom: 14 },
  field: {
    flexDirection: 'row', alignItems: 'center', gap: 10, minHeight: 52, paddingHorizontal: 14,
    backgroundColor: Colors.inputBackground, borderRadius: 14, borderWidth: 1, borderColor: Colors.border,
  },
  focused: { borderColor: Colors.primary },
  errorBorder: { borderColor: Colors.error },
  input: { flex: 1, fontSize: 15, color: Colors.textPrimary, paddingVertical: 12 },
  toggle: { fontSize: 13, fontWeight: '600', color: Colors.primary },
  error: { marginTop: 6, marginLeft: 4, fontSize: 12, color: Colors.error },
});
