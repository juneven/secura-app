import { StyleSheet } from "react-native";

export default StyleSheet.create({
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