import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    Alert,
    Dimensions,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const [linkInput, setLinkInput] = useState("");

  const handleCheckLink = () => {
    if (!linkInput.trim()) {
      const msg = "Silakan masukkan atau tempel tautan terlebih dahulu.";
      Platform.OS === "web" ? alert(msg) : Alert.alert("Perhatian", msg);
      return;
    }
    const isRisky =
      linkInput.includes("apk") ||
      linkInput.includes("hadiah") ||
      linkInput.includes("claim");
    const msg = isRisky
      ? "Peringatan: Tautan mencurigakan berpotensi bahaya!"
      : "Tautan terverifikasi aman.";
    Platform.OS === "web" ? alert(msg) : Alert.alert("Hasil Pengecekan", msg);
  };

  const recentItems = [
    {
      id: "1",
      url: "https://secured-check.org/i...",
      status: "avoid",
      statusLabel: "Avoid This Link",
      time: "1h ago",
    },
    {
      id: "2",
      url: "https://secured-check.org/i...",
      status: "careful",
      statusLabel: "Be Careful",
      time: "1h ago",
    },
    {
      id: "3",
      url: "https://secured-check.org/i...",
      status: "safe",
      statusLabel: "Looks Safe",
      time: "1h ago",
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Logo Secura di Header (DITENGAHKAN / CENTER & DIPERBESAR) */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/secura-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Kartu Utama "Is this link safe?" */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Is this link safe?</Text>
        <Text style={styles.cardSubtitle}>Check a link before you click</Text>

        {/* Input Box */}
        <View style={styles.inputBox}>
          <Ionicons
            name="link-outline"
            size={22}
            color="#8DB6F8"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Paste a link here"
            placeholderTextColor="#A3BEE8"
            value={linkInput}
            onChangeText={setLinkInput}
            multiline
          />
        </View>

        {/* Tombol Check Link */}
        <TouchableOpacity
          style={styles.checkButton}
          activeOpacity={0.85}
          onPress={handleCheckLink}
        >
          <Text style={styles.checkButtonText}>Check Link</Text>
        </TouchableOpacity>

        {/* Tombol Share a link from another app */}
        <TouchableOpacity
          style={styles.shareButton}
          activeOpacity={0.85}
          onPress={() =>
            setLinkInput("https://secured-check.org/i/verify-apk-download")
          }
        >
          <Ionicons
            name="share-outline"
            size={18}
            color="#4E8DF8"
            style={{ marginRight: 6 }}
          />
          <Text style={styles.shareButtonText}>
            Share a link from another app
          </Text>
        </TouchableOpacity>
      </View>

      {/* Banner "You're protected" */}
      <View style={styles.protectedCard}>
        <View style={styles.protectedIconContainer}>
          <Ionicons name="shield-checkmark" size={28} color="#4E8DF8" />
        </View>
        <View style={styles.protectedTextContainer}>
          <Text style={styles.protectedTitle}>You&apos;re protected</Text>
          <Text style={styles.protectedSubtitle}>
            Secura is ready to check suspicious link
          </Text>
        </View>
      </View>

      {/* Recent Checks */}
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
    paddingTop: 10,
    paddingBottom: 110,
  },
  header: {
    alignItems: "center", // Logo tepat di tengah
    justifyContent: "center",
    marginBottom: 16,
    marginTop: 4,
  },
  logo: {
    width: Math.min(width * 0.85, 330), // Ukuran logo lebih besar
    height: 90,
  },
  card: {
    backgroundColor: "#68A2FD",
    borderRadius: 24,
    padding: 20,
    marginBottom: 18,
    shadowColor: "#4E8DF8",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 16,
  },
  inputBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "flex-start",
    minHeight: 90,
    marginBottom: 14,
  },
  inputIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: "#1E293B",
    textAlignVertical: "top",
    padding: 0,
  },
  checkButton: {
    backgroundColor: "#4889F8",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  checkButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  shareButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  shareButtonText: {
    color: "#4E8DF8",
    fontSize: 13,
    fontWeight: "600",
  },
  protectedCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#4E8DF8",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  protectedIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#EEF4FE",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  protectedTextContainer: {
    flex: 1,
  },
  protectedTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#4E8DF8",
    marginBottom: 2,
  },
  protectedSubtitle: {
    fontSize: 12,
    color: "#8FA3C7",
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#4E8DF8",
    marginBottom: 12,
  },
  recentList: {
    gap: 10,
  },
  historyCard: {
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
  historyLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 8,
  },
  badge: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  badgeRed: {
    backgroundColor: "#FEECEB",
  },
  badgeOrange: {
    backgroundColor: "#FEF4E8",
  },
  badgeGreen: {
    backgroundColor: "#EBF9F0",
  },
  historyTexts: {
    flex: 1,
  },
  historyUrl: {
    fontSize: 12,
    color: "#6C7D9B",
    marginBottom: 2,
  },
  historyStatus: {
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
  historyTime: {
    fontSize: 11,
    color: "#A0B0C9",
    fontWeight: "500",
  },
});