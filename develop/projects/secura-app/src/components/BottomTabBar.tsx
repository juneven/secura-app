import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type TabType = "home" | "history" | "settings";

interface BottomTabBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function BottomTabBar({
  activeTab,
  onTabChange,
}: BottomTabBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        {/* Tab 1: Home */}
        <TouchableOpacity
          style={styles.tabButton}
          activeOpacity={0.8}
          onPress={() => onTabChange("home")}
        >
          <Ionicons
            name={activeTab === "home" ? "home" : "home-outline"}
            size={22}
            color={activeTab === "home" ? "#FFFFFF" : "rgba(255, 255, 255, 0.65)"}
            style={styles.tabIcon}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === "home" && styles.tabLabelActive,
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>

        {/* Tab 2: History */}
        <TouchableOpacity
          style={styles.tabButton}
          activeOpacity={0.8}
          onPress={() => onTabChange("history")}
        >
          <Ionicons
            name={activeTab === "history" ? "time" : "time-outline"}
            size={22}
            color={activeTab === "history" ? "#FFFFFF" : "rgba(255, 255, 255, 0.65)"}
            style={styles.tabIcon}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === "history" && styles.tabLabelActive,
            ]}
          >
            History
          </Text>
        </TouchableOpacity>

        {/* Tab 3: Settings */}
        <TouchableOpacity
          style={styles.tabButton}
          activeOpacity={0.8}
          onPress={() => onTabChange("settings")}
        >
          <Ionicons
            name={activeTab === "settings" ? "settings-sharp" : "settings-outline"}
            size={22}
            color={activeTab === "settings" ? "#FFFFFF" : "rgba(255, 255, 255, 0.65)"}
            style={styles.tabIcon}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === "settings" && styles.tabLabelActive,
            ]}
          >
            Settings
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  bar: {
    backgroundColor: "#4E8DF8",
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 10,
    paddingHorizontal: 16,
    shadowColor: "#4E8DF8",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 8,
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    paddingHorizontal: 20,
  },
  tabIcon: {
    marginBottom: 2,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.65)",
  },
  tabLabelActive: {
    color: "#FFFFFF",
  },
});