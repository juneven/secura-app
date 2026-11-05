import { Text, View } from "react-native";
import styles from "./settingsStyles";

export default function AboutSection() {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>About</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.rowText}>
            <Text style={styles.itemTitle}>App Version</Text>
            <Text style={styles.itemSubtitle}>
              Secura v1.0.0 (Release Build)
            </Text>
          </View>
          <Text style={styles.badgeVersion}>Up to date</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <View style={styles.rowText}>
            <Text style={styles.itemTitle}>Protection Engine</Text>
            <Text style={styles.itemSubtitle}>
              On-Device AI Threat Shield
            </Text>
          </View>
          <Text style={styles.badgeActive}>● Active</Text>
        </View>
      </View>
    </View>
  );
}