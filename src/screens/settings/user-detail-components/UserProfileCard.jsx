import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./userDetailStyles";

export default function UserProfileCard({ onEditProfile }) {
  return (
    <View style={styles.profileCard}>
      <View style={styles.profileLeft}>
        <View style={styles.avatarLarge}>
          <Ionicons name="person" size={34} color="#4E8DF8" />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.userName}>Secura User</Text>
          <Text style={styles.userPlan}>Free Plan</Text>
          <View style={styles.onlineBadge}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineText}>Online</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.editButton}
        activeOpacity={0.8}
        onPress={onEditProfile}
      >
        <Ionicons name="pencil" size={18} color="#4E8DF8" />
      </TouchableOpacity>
    </View>
  );
}