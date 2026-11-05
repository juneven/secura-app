import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import styles from "./userDetailStyles";

export default function PreferencesSection() {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Preferences</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.iconBox}>
            <Ionicons name="globe-outline" size={18} color="#4E8DF8" />
          </View>
          <View style={styles.rowText}>
            <Text style={styles.label}>Language</Text>
            <Text style={styles.value}>English (Bahasa Indonesia)</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#4E8DF8" />
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <View style={styles.iconBox}>
            <Ionicons
              name="notifications-outline"
              size={18}
              color="#4E8DF8"
            />
          </View>
          <View style={styles.rowText}>
            <Text style={styles.label}>Notifications Settings</Text>
            <Text style={styles.value}>Manage your notification preferences</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#4E8DF8" />
        </View>
      </View>
    </View>
  );
}