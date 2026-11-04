import { Ionicons } from "@expo/vector-icons";
import {
    Alert,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface UserDetailScreenProps {
  onBack: () => void;
}

export default function UserDetailScreen({ onBack }: UserDetailScreenProps) {
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
      {/* Top Header dengan Tombol Panah Kembali (←) */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={onBack}
        >
          <Ionicons name="arrow-back" size={22} color="#4E8DF8" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Secura User</Text>
      </View>

      {/* Kartu Profil Utama */}
      <View style={styles.profileCard}>
        <View style={styles.profileLeft}>
          <View style={styles.avatarLarge}>
            <Ionicons name="person" size={34} color="#4E8DF8" />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>Secura User</Text>
            <Text style={styles.userPlan}>Free Plan</Text>
            <View style={styles.onlineBadge}>
              <View style={styles.onlineDot} />
              <Text style={styles.onlineText}>Online</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.editButton}
          activeOpacity={0.8}
          onPress={handleEditProfile}
        >
          <Ionicons name="pencil" size={18} color="#4E8DF8" />
        </TouchableOpacity>
      </View>

      {/* Group: Account Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Information</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.iconBox}>
              <Ionicons name="person-outline" size={18} color="#4E8DF8" />
            </View>
            <View style={styles.rowText}>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.value}>Secura User</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#4E8DF8" />
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <View style={styles.iconBox}>
              <Ionicons name="mail-outline" size={18} color="#4E8DF8" />
            </View>
            <View style={styles.rowText}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>youremail@gmail.com</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#4E8DF8" />
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <View style={styles.iconBox}>
              <Ionicons
                name="shield-checkmark-outline"
                size={18}
                color="#4E8DF8"
              />
            </View>
            <View style={styles.rowText}>
              <Text style={styles.label}>Account Type</Text>
              <Text style={styles.value}>Free Plan</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#4E8DF8" />
          </View>
        </View>
      </View>

      {/* Group: Preferences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.iconBox}>
              <Ionicons name="globe-outline" size={18} color="#4E8DF8" />
            </View>
            <View style={styles.rowText}>
              <Text style={styles.label}>Language</Text>
              <Text style={styles.value}>English (Bahasa Indonesia)</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#4E8DF8" />
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <View style={styles.iconBox}>
              <Ionicons
                name="notifications-outline"
                size={18}
                color="#4E8DF8"
              />
            </View>
            <View style={styles.rowText}>
              <Text style={styles.label}>Notifications Settings</Text>
              <Text style={styles.value}>Manage your notification preferences</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#4E8DF8" />
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#DCEBFC",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#4E8DF8",
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 22,
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
  avatarLarge: {
    width: 64,
    height: 64,
    borderRadius: 22,
    backgroundColor: "#DCEBFC",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  profileInfo: {
    justifyContent: "center",
  },
  userName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#4E8DF8",
    marginBottom: 2,
  },
  userPlan: {
    fontSize: 13,
    color: "#8FA3C7",
    marginBottom: 4,
  },
  onlineBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#10B981",
    marginRight: 4,
  },
  onlineText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#10B981",
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: "#EEF4FE",
    alignItems: "center",
    justifyContent: "center",
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
    paddingVertical: 14,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#EEF4FE",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  rowText: {
    flex: 1,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#334155",
    marginBottom: 2,
  },
  value: {
    fontSize: 12,
    color: "#8FA3C7",
  },
  divider: {
    height: 1,
    backgroundColor: "#F2F6FD",
  },
});