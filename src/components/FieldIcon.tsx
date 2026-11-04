import { StyleSheet, View } from 'react-native';

export type FieldIconName = 'mailIcon' | 'lockIcon' | 'userIcon';

// Ikon dari View (belum ada library ikon)
export default function FieldIcon({ name, color }: { name: FieldIconName; color: string }) {
  if (name === 'mailIcon') {
    return (
      <View style={[styles.box, styles.mail, { borderColor: color }]}>
        <View style={[styles.mailFlap, { borderColor: color }]} />
      </View>
    );
  }
  if (name === 'lockIcon') {
    return (
      <View style={styles.box}>
        <View style={[styles.shackle, { borderColor: color }]} />
        <View style={[styles.lockBody, { backgroundColor: color }]} />
      </View>
    );
  }
  return (
    <View style={styles.box}>
      <View style={[styles.head, { backgroundColor: color }]} />
      <View style={[styles.shoulders, { backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  box: { width: 20, height: 20, alignItems: 'center', justifyContent: 'center' },
  mail: { height: 14, borderWidth: 1.8, borderRadius: 3, overflow: 'hidden', alignItems: 'center', justifyContent: 'flex-start' },
  mailFlap: { width: 9, height: 9, marginTop: -5, borderRightWidth: 1.8, borderBottomWidth: 1.8, transform: [{ rotate: '45deg' }] },
  shackle: { width: 11, height: 9, borderWidth: 2, borderBottomWidth: 0, borderTopLeftRadius: 6, borderTopRightRadius: 6, marginBottom: -1 },
  lockBody: { width: 15, height: 10, borderRadius: 3 },
  head: { width: 8, height: 8, borderRadius: 4 },
  shoulders: { width: 16, height: 8, marginTop: 2, borderTopLeftRadius: 8, borderTopRightRadius: 8, borderBottomLeftRadius: 2, borderBottomRightRadius: 2 },
});
