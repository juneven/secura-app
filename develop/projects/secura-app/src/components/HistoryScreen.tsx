import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type FilterType = "all" | "safe" | "risky";

interface HistoryItem {
  id: string;
  url: string;
  status: "safe" | "avoid" | "careful";
  statusLabel: string;
  time: string;
  dateGroup: "today" | "past";
}

export default function HistoryScreen() {
  const [filter, setFilter] = useState<FilterType>("all");

  const items: HistoryItem[] = [
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

  // Komponen Badge Perisai Vektor Tanpa Emoji
  const renderShieldBadge = (status: "safe" | "avoid" | "careful") => {
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
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>History</Text>

      {/* Segmented Filter Pills */}
      <View style={styles.pillContainer}>
        <TouchableOpacity
          style={[styles.pill, filter === "all" && styles.pillActive]}
          activeOpacity={0.8}
          onPress={() => setFilter("all")}
        >
          <Text
            style={[styles.pillText, filter === "all" && styles.pillTextActive]}
          >
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.pill, filter === "safe" && styles.pillActive]}
          activeOpacity={0.8}
          onPress={() => setFilter("safe")}
        >
          <Text
            style={[styles.pillText, filter === "safe" && styles.pillTextActive]}
          >
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

      {/* Bagian Today */}
      {todayList.length > 0 && (
        <View style={styles.group}>
          <Text style={styles.groupTitle}>Today</Text>
          {todayList.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardLeft}>
                {renderShieldBadge(item.status)}
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
          ))}
        </View>
      )}

      {/* Bagian Tanggal (Format Tanggal, Bukan 'Yesterday') */}
      {pastList.length > 0 && (
        <View style={styles.group}>
          <Text style={styles.groupTitle}>02 Nov 2026</Text>
          {pastList.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardLeft}>
                {renderShieldBadge(item.status)}
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
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDF2FB",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 110,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#4E8DF8",
    marginBottom: 16,
  },
  pillContainer: {
    flexDirection: "row",
    backgroundColor: "#6DA4FB",
    borderRadius: 16,
    padding: 4,
    marginBottom: 22,
  },
  pill: {
    flex: 1,
    paddingVertical: 9,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  pillActive: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  pillText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  pillTextActive: {
    color: "#4E8DF8",
  },
  group: {
    marginBottom: 20,
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#4E8DF8",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 8,
  },
  badgeContainer: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  badgeRedBg: {
    backgroundColor: "#FEECEB",
  },
  badgeOrangeBg: {
    backgroundColor: "#FEF4E8",
  },
  badgeGreenBg: {
    backgroundColor: "#EBF9F0",
  },
  badgeIconOverlay: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  infoLetter: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 13,
  },
  cardTexts: {
    flex: 1,
  },
  cardUrl: {
    fontSize: 12,
    color: "#6C7D9B",
    marginBottom: 2,
  },
  cardStatus: {
    fontSize: 12,
    fontWeight: "700",
  },
  textRed: {
    color: "#F05252",
  },
  textOrange: {
    color: "#F59E0B",
  },
  textGreen: {
    color: "#10B981",
  },
  cardTime: {
    fontSize: 11,
    color: "#A0B0C9",
    fontWeight: "500",
  },
});