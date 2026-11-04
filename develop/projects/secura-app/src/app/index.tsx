import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

type Step = "intro" | "onboarding-1" | "onboarding-2" | "onboarding-3";

export default function Index() {
  const [currentStep, setCurrentStep] = useState<Step>("intro");
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (Platform.OS === "web" && typeof document !== "undefined") {
      const fontId = "montserrat-alternates-font";
      if (!document.getElementById(fontId)) {
        const link = document.createElement("link");
        link.id = fontId;
        link.rel = "stylesheet";
        link.href =
          "https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@700;800;900&display=swap";
        document.head.appendChild(link);
      }
    }
  }, []);

  useEffect(() => {
    if (currentStep === "intro") {
      progressAnim.setValue(0);
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 2500,
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished) {
          setCurrentStep("onboarding-1");
        }
      });
    }
  }, [currentStep, progressAnim]);

  const handleGetStarted = () => {
    if (Platform.OS === "web") {
      alert("Selamat Datang di Secura! Anda telah menyelesaikan panduan awal.");
    } else {
      Alert.alert(
        "Selamat Datang di Secura",
        "Anda telah menyelesaikan panduan awal proteksi anti-fraud.",
        [{ text: "Mulai", onPress: () => {} }]
      );
    }
  };

  // Lebar animasi bar loading
  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 180],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* LAYAR 1: INTRO SCREEN */}
      {currentStep === "intro" && (
        <View style={styles.introContainer}>
          <View style={styles.topSpacer} />

          <View style={styles.introCenterSection}>
            <Image
              source={require("../../assets/images/intro-logo.png")}
              style={styles.introLogo}
              resizeMode="contain"
            />

            <Text style={styles.introSlogan}>Recognize, Check, Protect.</Text>

            {/* Progress Bar Kapsul */}
            <View style={styles.progressBarTrack}>
              <Animated.View
                style={[
                  styles.progressBarFill,
                  {
                    width: progressWidth,
                  },
                ]}
              />
            </View>
          </View>

          {/* Tulisan SECURA di Bawah dengan Font Montserrat Alternates */}
          <View style={styles.introBottomSection}>
            <Text style={styles.introBrandName}>SECURA</Text>
          </View>
        </View>
      )}

      {/* LAYAR 2: ONBOARDING SCREEN 1 */}
      {currentStep === "onboarding-1" && (
        <View style={styles.onboardingContainer}>
          {/* 3 Strip Indikator di Atas */}
          <View style={styles.indicatorRow}>
            <View style={[styles.indicatorBar, styles.indicatorActive]} />
            <View style={[styles.indicatorBar, styles.indicatorInactive]} />
            <View style={[styles.indicatorBar, styles.indicatorInactive]} />
          </View>

          {/* Judul */}
          <View style={styles.headingContainer}>
            <Text style={styles.headingText}>Think Before{"\n"}You Click.</Text>
          </View>

          {/* Ilustrasi */}
          <View style={styles.illustrationContainer}>
            <Image
              source={require("../../assets/images/onboarding-1.png")}
              style={styles.illustrationImage}
              resizeMode="contain"
            />
          </View>

          {/* Tombol Next */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              activeOpacity={0.85}
              onPress={() => setCurrentStep("onboarding-2")}
            >
              <Text style={styles.primaryButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* LAYAR 3: ONBOARDING SCREEN 2 */}
      {currentStep === "onboarding-2" && (
        <View style={styles.onboardingContainer}>
          {/* 3 Strip Indikator di Atas */}
          <View style={styles.indicatorRow}>
            <View style={[styles.indicatorBar, styles.indicatorInactive]} />
            <View style={[styles.indicatorBar, styles.indicatorActive]} />
            <View style={[styles.indicatorBar, styles.indicatorInactive]} />
          </View>

          {/* Judul */}
          <View style={styles.headingContainer}>
            <Text style={styles.headingText}>Check Every{"\n"}Link.</Text>
          </View>

          {/* Ilustrasi */}
          <View style={styles.illustrationContainer}>
            <Image
              source={require("../../assets/images/onboarding-2.png")}
              style={styles.illustrationImage}
              resizeMode="contain"
            />
          </View>

          {/* Tombol Next */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              activeOpacity={0.85}
              onPress={() => setCurrentStep("onboarding-3")}
            >
              <Text style={styles.primaryButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* LAYAR 4: ONBOARDING SCREEN 3 */}
      {currentStep === "onboarding-3" && (
        <View style={styles.onboardingContainer}>
          {/* 3 Strip Indikator di Atas */}
          <View style={styles.indicatorRow}>
            <View style={[styles.indicatorBar, styles.indicatorInactive]} />
            <View style={[styles.indicatorBar, styles.indicatorInactive]} />
            <View style={[styles.indicatorBar, styles.indicatorActive]} />
          </View>

          {/* Judul */}
          <View style={styles.headingContainer}>
            <Text style={styles.headingText}>Stay Safe{"\n"}Online.</Text>
          </View>

          {/* Ilustrasi */}
          <View style={styles.illustrationContainer}>
            <Image
              source={require("../../assets/images/onboarding-3.png")}
              style={styles.illustrationImage}
              resizeMode="contain"
            />
          </View>

          {/* Tombol Get Started */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              activeOpacity={0.85}
              onPress={handleGetStarted}
            >
              <Text style={styles.primaryButtonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#77ABFD",
  },

  // ===== Gaya Layar Intro =====
  introContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 28,
  },
  topSpacer: {
    height: 40,
  },
  introCenterSection: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: -10,
  },
  introLogo: {
    width: 350, 
    height: 350,
    marginBottom: 24,
  },
  introSlogan: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.2,
    marginBottom: 22,
    textAlign: "center",
  },
  progressBarTrack: {
    width: 190,
    height: 12,
    backgroundColor: "rgba(255, 255, 255, 0.35)",
    borderRadius: 999,
    padding: 2,
    justifyContent: "center",
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#3A7EFC",
    borderRadius: 999,
  },
  introBottomSection: {
    alignItems: "center",
    paddingBottom: 18,
  },
  introBrandName: {
    fontSize: 28,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 3.5,
    fontFamily: Platform.select({
      web: "'Montserrat Alternates', sans-serif",
      default: undefined,
    }),
  },

  // ===== Gaya Layar Onboarding =====
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