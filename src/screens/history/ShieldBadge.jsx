import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import styles from "./historyStyles";

export default function ShieldBadge({ status }) {
  if (status === "avoid") {
    return (
      <View style={[styles.badgeContainer, styles.badgeRedBg]}>
        <Ionicons name="shield" size={26} color="#F87171" />
        <View style={styles.badgeIconOverlay}>
          <Ionicons name="close" size={13} color="#FFFFFF" />
        </View>
      </View>
    );
  }
  if (status === "careful") {
    return (
      <View style={[styles.badgeContainer, styles.badgeOrangeBg]}>
        <Ionicons name="shield" size={26} color="#FB923C" />
        <View style={styles.badgeIconOverlay}>
          <Text style={styles.infoLetter}>!</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={[styles.badgeContainer, styles.badgeGreenBg]}>
      <Ionicons name="shield" size={26} color="#4ADE80" />
      <View style={styles.badgeIconOverlay}>
        <Ionicons name="checkmark" size={13} color="#FFFFFF" />
      </View>
    </View>
  );
}