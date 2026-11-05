import { Text, View } from "react-native";
import HistoryCard from "./HistoryCard";
import styles from "./historyStyles";

export default function HistoryGroup({ title, items }) {
  if (items.length === 0) return null;

  return (
    <View style={styles.group}>
      <Text style={styles.groupTitle}>{title}</Text>
      {items.map((item) => (
        <HistoryCard key={item.id} item={item} />
      ))}
    </View>
  );
}