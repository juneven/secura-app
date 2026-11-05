import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  onboardingContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 28,
    paddingTop: 12,
    paddingBottom: 28,
  },
  indicatorRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 24,
    marginTop: 4,
  },
  indicatorBar: {
    flex: 1,
    height: 4,
    borderRadius: 999,
  },
  indicatorActive: {
    backgroundColor: "#FFFFFF",
  },
  indicatorInactive: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
  headingContainer: {
    marginBottom: 8,
  },
  headingText: {
    fontSize: 34,
    fontWeight: "800",
    color: "#FFFFFF",
    lineHeight: 42,
    letterSpacing: -0.5,
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
  },
  illustrationImage: {
    width: width * 0.76,
    height: width * 0.76,
    maxWidth: 320,
    maxHeight: 320,
  },
  buttonContainer: {
    paddingBottom: 8,
  },
  primaryButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#1B3B8A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  primaryButtonText: {
    color: "#4A85F6",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
});