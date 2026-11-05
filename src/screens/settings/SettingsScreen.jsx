import { useState } from "react";
import { Alert, Platform, ScrollView, Text } from "react-native";

import ProfileCard from "./settings-components/ProfileCard";
import SecuritySection from "./settings-components/SecuritySection";
import GeneralSection from "./settings-components/GeneralSection";
import AboutSection from "./settings-components/AboutSection";
import styles from "./settings-components/settingsStyles";

export default function SettingsScreen({ onNavigateToUserDetail }) {
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
      <ProfileCard onNavigateToUserDetail={onNavigateToUserDetail} />

      <Text style={styles.title}>Settings</Text>

      <SecuritySection
        autoScan={autoScan}
        setAutoScan={setAutoScan}
        alertNotif={alertNotif}
        setAlertNotif={setAlertNotif}
      />

      <GeneralSection
        largeText={largeText}
        setLargeText={setLargeText}
        saveHistory={saveHistory}
        setSaveHistory={setSaveHistory}
        handleClearHistory={handleClearHistory}
      />

      <AboutSection />
    </ScrollView>
  );
}