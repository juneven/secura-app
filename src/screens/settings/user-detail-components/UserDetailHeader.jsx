import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./userDetailStyles";

export default function UserDetailHeader({ onBack }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        activeOpacity={0.8}
        onPress={onBack}
      >
        <Ionicons name="arrow-back" size={22} color="#4E8DF8" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Secura User</Text>
    </View>
  );
}