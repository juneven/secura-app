import { Alert, Platform, ScrollView } from "react-native";
import UserDetailHeader from "./user-detail-components/UserDetailHeader";
import UserProfileCard from "./user-detail-components/UserProfileCard";
import AccountInformationSection from "./user-detail-components/AccountInformationSection";
import PreferencesSection from "./user-detail-components/PreferencesSection";
import styles from "./user-detail-components/userDetailStyles";

export default function UserDetailScreen({ onBack }) {
  const handleEditProfile = () => {
    const msg = "Fitur edit profil akan segera hadir.";
    Platform.OS === "web" ? alert(msg) : Alert.alert("Info", msg);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <UserDetailHeader onBack={onBack} />
      <UserProfileCard onEditProfile={handleEditProfile} />
      <AccountInformationSection />
      <PreferencesSection />
    </ScrollView>
  );
}