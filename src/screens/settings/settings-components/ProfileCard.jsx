import { Text, TouchableOpacity, View } from "react-native";
import styles from "./settingsStyles";

export default function ProfileCard({ onNavigateToUserDetail }) {
  return (
    <TouchableOpacity
      style={styles.profileCard}
      activeOpacity={0.8}
      onPress={onNavigateToUserDetail}
    >
      <View style={styles.profileLeft}>
        <View style={styles.avatar}>
          <Text style={styles.avatarEmoji}>👤</Text>
        </View>
        <Text style={styles.profileName}>Secura User</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );
}