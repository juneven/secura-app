import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";

interface SettingsScreenProps {
  onNavigateToUserDetail: () => void;
}

export default function SettingsScreen({
  onNavigateToUserDetail,
}: SettingsScreenProps) {
  const [autoScan, setAutoScan] = useState(true);
  const [alertNotif, setAlertNotif] = useState(true);
  const [largeText, setLargeText] = useState(false);
  const [saveHistory, setSaveHistory] = useState(true);

  const handleClearHistory = () => {
    const msg = "Semua riwayat pengecekan tautan telah dibersihkan.";
    Platform.OS === "web" ? alert(msg) : Alert.alert("Sukses", msg);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
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

      <Text style={styles.title}>Settings</Text>

      {/* Security */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.rowText}>
              <Text style={styles.itemTitle}>Auto-scan copied links</Text>
              <Text style={styles.itemSubtitle}>
                Check links as soon as you copy them
              </Text>
            </View>
            <Switch
              value={autoScan}
              onValueChange={setAutoScan}
              trackColor={{ false: "#D3DEF3", true: "#4E8DF8" }}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <View style={styles.rowText}>
              <Text style={styles.itemTitle}>Alert Notifications</Text>
              <Text style={styles.itemSubtitle}>
                Get warned about dangerous links
              </Text>
            </View>
            <Switch
              value={alertNotif}
              onValueChange={setAlertNotif}
              trackColor={{ false: "#D3DEF3", true: "#4E8DF8" }}
            />
          </View>
        </View>
      </View>

      {/* General */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.rowText}>
              <Text style={styles.itemTitle}>Large Text</Text>
              <Text style={styles.itemSubtitle}>
                Make text bigger and easier to read
              </Text>
            </View>
            <Switch
              value={largeText}
              onValueChange={setLargeText}
              trackColor={{ false: "#D3DEF3", true: "#4E8DF8" }}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <View style={styles.rowText}>
              <Text style={styles.itemTitle}>Save History</Text>
              <Text style={styles.itemSubtitle}>
                Keep a records of link you&apos;ve checked
              </Text>
            </View>
            <Switch
              value={saveHistory}
              onValueChange={setSaveHistory}
              trackColor={{ false: "#D3DEF3", true: "#4E8DF8" }}
            />
          </View>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.rowAction}
            activeOpacity={0.7}
            onPress={handleClearHistory}
          >
            <Text style={styles.dangerTitle}>Clear History</Text>
            <Text style={styles.itemSubtitle}>Remove all saved link checks</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* About */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.rowText}>
              <Text style={styles.itemTitle}>App Version</Text>
              <Text style={styles.itemSubtitle}>
                Secura v1.0.0 (Release Build)
              </Text>
            </View>
            <Text style={styles.badgeVersion}>Up to date</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <View style={styles.rowText}>
              <Text style={styles.itemTitle}>Protection Engine</Text>
              <Text style={styles.itemSubtitle}>
                On-Device AI Threat Shield
              </Text>
            </View>
            <Text style={styles.badgeActive}>● Active</Text>
          </View>
        </View>
      </View>
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
  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    shadowColor: "#4E8DF8",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  profileLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#4E8DF8",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  avatarEmoji: {
    fontSize: 20,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#4E8DF8",
  },
  chevron: {
    fontSize: 24,
    color: "#4E8DF8",
    fontWeight: "700",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#4E8DF8",
    marginBottom: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#4E8DF8",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
  },
  rowText: {
    flex: 1,
    marginRight: 12,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#4E8DF8",
    marginBottom: 2,
  },
  dangerTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#F05252",
    marginBottom: 2,
  },
  itemSubtitle: {
    fontSize: 12,
    color: "#8FA3C7",
    fontWeight: "500",
  },
  rowAction: {
    paddingVertical: 14,
  },
  divider: {
    height: 1,
    backgroundColor: "#F2F6FD",
  },
  badgeVersion: {
    fontSize: 12,
    color: "#6B7280",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontWeight: "600",
  },
  badgeActive: {
    fontSize: 12,
    color: "#10B981",
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontWeight: "700",
  },
});