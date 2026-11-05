import { useState } from "react";
import { Alert, Platform, ScrollView } from "react-native";
import HomeHeader from "./home/HomeHeader";
import LinkCheckerCard from "./home/LinkCheckerCard";
import ProtectionBanner from "./home/ProtectionBanner";
import RecentChecks from "./home/RecentChecks";
import styles from "./home/homeStyles";

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
      <HomeHeader />
      <LinkCheckerCard
        linkInput={linkInput}
        setLinkInput={setLinkInput}
        handleCheckLink={handleCheckLink}
      />
      <ProtectionBanner />
      <RecentChecks recentItems={recentItems} />
    </ScrollView>
  );
}