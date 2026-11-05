import { StyleSheet } from "react-native";

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

export default styles;