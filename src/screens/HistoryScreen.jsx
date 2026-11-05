import { useState } from "react";
import { ScrollView, Text } from "react-native";
import HistoryFilters from "./history/HistoryFilters";
import HistoryGroup from "./history/HistoryGroup";
import styles from "./history/historyStyles";

export default function HistoryScreen() {
  const [filter, setFilter] = useState("all");

  const items = [
    {
      id: "1",
      url: "https://secured-check.org/i...",
      status: "avoid",
      statusLabel: "Avoid This Link",
      time: "1h ago",
      dateGroup: "today",
    },
    {
      id: "2",
      url: "https://secured-check.org/i...",
      status: "careful",
      statusLabel: "Be Careful",
      time: "1h ago",
      dateGroup: "today",
    },
    {
      id: "3",
      url: "https://secured-check.org/i...",
      status: "safe",
      statusLabel: "Looks Safe",
      time: "1h ago",
      dateGroup: "today",
    },
    {
      id: "4",
      url: "https://secured-check.org/i...",
      status: "avoid",
      statusLabel: "Avoid This Link",
      time: "1d ago",
      dateGroup: "past",
    },
    {
      id: "5",
      url: "https://secured-check.org/i...",
      status: "careful",
      statusLabel: "Be Careful",
      time: "1d ago",
      dateGroup: "past",
    },
    {
      id: "6",
      url: "https://secured-check.org/i...",
      status: "safe",
      statusLabel: "Looks Safe",
      time: "1d ago",
      dateGroup: "past",
    },
  ];

  const filteredItems = items.filter((item) => {
    if (filter === "safe") return item.status === "safe";
    if (filter === "risky")
      return item.status === "avoid" || item.status === "careful";
    return true;
  });

  const todayList = filteredItems.filter((i) => i.dateGroup === "today");
  const pastList = filteredItems.filter((i) => i.dateGroup === "past");

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>History</Text>
      <HistoryFilters filter={filter} setFilter={setFilter} />
      <HistoryGroup title="Today" items={todayList} />
      <HistoryGroup title="02 Nov 2026" items={pastList} />
    </ScrollView>
  );
}