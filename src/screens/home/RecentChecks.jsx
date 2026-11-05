import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import styles from "./homeStyles";

export default function RecentChecks({ recentItems }) {
  return (
    <>
      <Text style={styles.sectionTitle}>Recent Checks</Text>
      <View style={styles.recentList}>
        {recentItems.map((item) => (
          <View key={item.id} style={styles.historyCard}>
            <View style={styles.historyLeft}>
              <View
                style={[
                  styles.badge,
                  item.status === "avoid"
                    ? styles.badgeRed
                    : item.status === "careful"
                    ? styles.badgeOrange
                    : styles.badgeGreen,
                ]}
              >
                {item.status === "avoid" ? (
                  <Ionicons name="close" size={22} color="#F05252" />
                ) : item.status === "careful" ? (
                  <Ionicons name="alert" size={20} color="#F59E0B" />
                ) : (
                  <Ionicons name="checkmark" size={22} color="#10B981" />
                )}
              </View>
              <View style={styles.historyTexts}>
                <Text style={styles.historyUrl} numberOfLines={1}>
                  {item.url}
                </Text>
                <Text
                  style={[
                    styles.historyStatus,
                    item.status === "avoid"
                      ? styles.textRed
                      : item.status === "careful"
                      ? styles.textOrange
                      : styles.textGreen,
                  ]}
                >
                  {item.statusLabel}
                </Text>
              </View>
            </View>
            <Text style={styles.historyTime}>{item.time}</Text>
          </View>
        ))}
      </View>
    </>
  );
}