import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import styles from "./userDetailStyles";

export default function AccountInformationSection() {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Account Information</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.iconBox}>
            <Ionicons name="person-outline" size={18} color="#4E8DF8" />
          </View>
          <View style={styles.rowText}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>Secura User</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#4E8DF8" />
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <View style={styles.iconBox}>
            <Ionicons name="mail-outline" size={18} color="#4E8DF8" />
          </View>
          <View style={styles.rowText}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>youremail@gmail.com</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#4E8DF8" />
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <View style={styles.iconBox}>
            <Ionicons
              name="shield-checkmark-outline"
              size={18}
              color="#4E8DF8"
            />
          </View>
          <View style={styles.rowText}>
            <Text style={styles.label}>Account Type</Text>
            <Text style={styles.value}>Free Plan</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#4E8DF8" />
        </View>
      </View>
    </View>
  );
}