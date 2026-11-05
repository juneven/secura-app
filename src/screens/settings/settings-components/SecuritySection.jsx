import { Switch, Text, View } from "react-native";
import styles from "./settingsStyles";

export default function SecuritySection({
  autoScan,
  setAutoScan,
  alertNotif,
  setAlertNotif,
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Security</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.rowText}>
            <Text style={styles.itemTitle}>Auto-scan copied links</Text>
            <Text style={styles.itemSubtitle}>
              Check links as soon as you copy them
            </Text>
          </View>
          <Switch
            value={autoScan}
            onValueChange={setAutoScan}
            trackColor={{ false: "#D3DEF3", true: "#4E8DF8" }}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <View style={styles.rowText}>
            <Text style={styles.itemTitle}>Alert Notifications</Text>
            <Text style={styles.itemSubtitle}>
              Get warned about dangerous links
            </Text>
          </View>
          <Switch
            value={alertNotif}
            onValueChange={setAlertNotif}
            trackColor={{ false: "#D3DEF3", true: "#4E8DF8" }}
          />
        </View>
      </View>
    </View>
  );
}