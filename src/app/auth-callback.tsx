import { Redirect } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';

// Tutup jendela login sosial; hasilnya diproses di socialAuth.ts
WebBrowser.maybeCompleteAuthSession();

export default function AuthCallbackScreen() {
  return <Redirect href="/login" />;
}
