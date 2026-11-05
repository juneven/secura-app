import { Text, View } from "react-native";
import ShieldBadge from "./ShieldBadge";
import styles from "./historyStyles";

export default function HistoryCard({ item }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardLeft}>
        <ShieldBadge status={item.status} />
        <View style={styles.cardTexts}>
          <Text style={styles.cardUrl} numberOfLines={1}>
            {item.url}
          </Text>
          <Text
            style={[
              styles.cardStatus,
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
      <Text style={styles.cardTime}>{item.time}</Text>
    </View>
  );
}