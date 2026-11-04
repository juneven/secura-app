import type React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ConnectivityNotice from './ConnectivityNotice';
import { Colors } from '@/constants/colors';

// Kerangka dasar halaman autentikasi
export default function AuthScreen({ children }: { children: React.ReactNode }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <View style={styles.blobTop} />
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={[
            styles.content,
            { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.inner}>
            {children}
            <ConnectivityNotice />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  flex: { flex: 1 },
  content: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  inner: { width: '100%', maxWidth: 420, alignItems: 'center' },
  blobTop: {
    position: 'absolute', top: -120, alignSelf: 'center', width: 420, height: 420,
    borderRadius: 210, backgroundColor: Colors.secondary, opacity: 0.25,
  },
});
