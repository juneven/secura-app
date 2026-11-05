import { Text, TouchableOpacity, View } from "react-native";
import styles from "./historyStyles";

export default function HistoryFilters({ filter, setFilter }) {
  return (
    <View style={styles.pillContainer}>
      <TouchableOpacity
        style={[styles.pill, filter === "all" && styles.pillActive]}
        activeOpacity={0.8}
        onPress={() => setFilter("all")}
      >
        <Text style={[styles.pillText, filter === "all" && styles.pillTextActive]}>
          All
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.pill, filter === "safe" && styles.pillActive]}
        activeOpacity={0.8}
        onPress={() => setFilter("safe")}
      >
        <Text style={[styles.pillText, filter === "safe" && styles.pillTextActive]}>
          Safe
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.pill, filter === "risky" && styles.pillActive]}
        activeOpacity={0.8}
        onPress={() => setFilter("risky")}
      >
        <Text
          style={[
            styles.pillText,
            filter === "risky" && styles.pillTextActive,
          ]}
        >
          Risky
        </Text>
      </TouchableOpacity>
    </View>
  );
}