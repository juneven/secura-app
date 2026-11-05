import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import styles from "./homeStyles";

export default function ProtectionBanner() {
  return (
    <View style={styles.protectedCard}>
      <View style={styles.protectedIconContainer}>
        <Ionicons name="shield-checkmark" size={28} color="#4E8DF8" />
      </View>
      <View style={styles.protectedTextContainer}>
        <Text style={styles.protectedTitle}>You&apos;re protected</Text>
        <Text style={styles.protectedSubtitle}>
          Secura is ready to check suspicious link
        </Text>
      </View>
    </View>
  );
}