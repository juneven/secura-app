import { StyleSheet, Text, View } from 'react-native';
import { API_BASE_URL, AUTH_CONFIG_PROBLEM, AUTH_CONFIGURED } from '@/config/api';
import { Colors } from '@/constants/colors';
import { ProbeStatus, useConnectivityReport } from '@/services/connectivity';

// Hanya mengembalikan teks jika server bermasalah
function serverProblem(server: ProbeStatus): string | null {
  if (server.state === 'unreachable') return 'Server SECURA tidak dapat dijangkau.';
  if (server.state === 'reachable' && !server.ok) return `Server SECURA merespons error (HTTP ${server.httpStatus}).`;
  return null;
}

// Tidak menampilkan apa pun jika tidak ada masalah
export default function ConnectivityNotice() {
  const { server } = useConnectivityReport();
  const configProblem = API_BASE_URL || AUTH_CONFIGURED ? null : (AUTH_CONFIG_PROBLEM ?? 'Server SECURA belum dikonfigurasi.');
  const message = configProblem ?? serverProblem(server);
  if (!message) return null;
  return (
    <View style={styles.wrap}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: 24, paddingHorizontal: 8, alignItems: 'center', gap: 2 },
  text: { fontSize: 11, lineHeight: 15, color: Colors.textSecondary, textAlign: 'center' },
});
