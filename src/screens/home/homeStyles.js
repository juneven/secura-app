import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

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
    marginBottom: 16,
    marginTop: 4,
  },
  logo: {
    width: "50%",
    width: Math.min(width * 0.85, 330),
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

export default styles;