import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
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

// Import Komponen Modular Layar Terpisah
import BottomTabBar, { TabType } from "../components/BottomTabBar";
import HistoryScreen from "../components/HistoryScreen";
import HomeScreen from "../components/HomeScreen";
import SettingsScreen from "../components/SettingsScreen";
import UserDetailScreen from "../components/UserDetailScreen";

const { width } = Dimensions.get("window");

type AppFlow = "intro" | "onboarding-1" | "onboarding-2" | "onboarding-3" | "main";
type MainView = TabType | "user-detail";

export default function Index() {
  const [appFlow, setAppFlow] = useState<AppFlow>("intro");
  const [currentView, setCurrentView] = useState<MainView>("home");

  const progressAnim = useRef(new Animated.Value(0)).current;

  // Memuat Font Google Montserrat Alternates jika dibuka di browser
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

  // Animasi progress bar pada Intro Screen (2.5 detik)
  useEffect(() => {
    if (appFlow === "intro") {
      progressAnim.setValue(0);
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 2500,
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished) {
          setAppFlow("onboarding-1");
        }
      });
    }
  }, [appFlow, progressAnim]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 180],
  });

  // =========================================================================
  // 1. ALUR INTRO & ONBOARDING
  // =========================================================================
  if (appFlow !== "main") {
    return (
      <SafeAreaView style={styles.introOnboardingContainer}>
        <StatusBar style="light" />

        {/* INTRO SCREEN */}
        {appFlow === "intro" && (
          <View style={styles.introContainer}>
            <View style={styles.topSpacer} />
            <View style={styles.introCenterSection}>
              <Image
                source={require("../../assets/images/intro-logo.png")}
                style={styles.introLogo}
                resizeMode="contain"
              />
              <Text style={styles.introSlogan}>Recognize, Check, Protect.</Text>
              <View style={styles.progressBarTrack}>
                <Animated.View
                  style={[styles.progressBarFill, { width: progressWidth }]}
                />
              </View>
            </View>
            <View style={styles.introBottomSection}>
              <Text style={styles.introBrandName}>SECURA</Text>
            </View>
          </View>
        )}

        {/* ONBOARDING 1 */}
        {appFlow === "onboarding-1" && (
          <View style={styles.onboardingContainer}>
            <View style={styles.indicatorRow}>
              <View style={[styles.indicatorBar, styles.indicatorActive]} />
              <View style={[styles.indicatorBar, styles.indicatorInactive]} />
              <View style={[styles.indicatorBar, styles.indicatorInactive]} />
            </View>
            <View style={styles.headingContainer}>
              <Text style={styles.headingText}>Think Before{"\n"}You Click.</Text>
            </View>
            <View style={styles.illustrationContainer}>
              <Image
                source={require("../../assets/images/onboarding-1.png")}
                style={styles.illustrationImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.primaryButton}
                activeOpacity={0.85}
                onPress={() => setAppFlow("onboarding-2")}
              >
                <Text style={styles.primaryButtonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* ONBOARDING 2 */}
        {appFlow === "onboarding-2" && (
          <View style={styles.onboardingContainer}>
            <View style={styles.indicatorRow}>
              <View style={[styles.indicatorBar, styles.indicatorInactive]} />
              <View style={[styles.indicatorBar, styles.indicatorActive]} />
              <View style={[styles.indicatorBar, styles.indicatorInactive]} />
            </View>
            <View style={styles.headingContainer}>
              <Text style={styles.headingText}>Check Every{"\n"}Link.</Text>
            </View>
            <View style={styles.illustrationContainer}>
              <Image
                source={require("../../assets/images/onboarding-2.png")}
                style={styles.illustrationImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.primaryButton}
                activeOpacity={0.85}
                onPress={() => setAppFlow("onboarding-3")}
              >
                <Text style={styles.primaryButtonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* ONBOARDING 3 */}
        {appFlow === "onboarding-3" && (
          <View style={styles.onboardingContainer}>
            <View style={styles.indicatorRow}>
              <View style={[styles.indicatorBar, styles.indicatorInactive]} />
              <View style={[styles.indicatorBar, styles.indicatorInactive]} />
              <View style={[styles.indicatorBar, styles.indicatorActive]} />
            </View>
            <View style={styles.headingContainer}>
              <Text style={styles.headingText}>Stay Safe{"\n"}Online.</Text>
            </View>
            <View style={styles.illustrationContainer}>
              <Image
                source={require("../../assets/images/onboarding-3.png")}
                style={styles.illustrationImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.primaryButton}
                activeOpacity={0.85}
                onPress={() => {
                  setAppFlow("main");
                  setCurrentView("home");
                }}
              >
                <Text style={styles.primaryButtonText}>Get Started</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </SafeAreaView>
    );
  }

  // =========================================================================
  // 2. HALAMAN UTAMA (MODULAR SCREENS DENGAN BOTTOM TAB BAR)
  // =========================================================================
  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar style="dark" />

      {/* Render Komponen Sesuai Tab Aktif */}
      {currentView === "home" && <HomeScreen />}
      {currentView === "history" && <HistoryScreen />}
      {currentView === "settings" && (
        <SettingsScreen onNavigateToUserDetail={() => setCurrentView("user-detail")} />
      )}
      {currentView === "user-detail" && (
        <UserDetailScreen onBack={() => setCurrentView("settings")} />
      )}

      {/* Floating Bottom Tab Bar */}
      <BottomTabBar
        activeTab={
          currentView === "user-detail" ? "settings" : (currentView as TabType)
        }
        onTabChange={(tab) => setCurrentView(tab)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
=======
  introOnboardingContainer: {
    flex: 1,
    backgroundColor: "#77ABFD",
  },
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
    width: 230,
    height: 230,
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
  mainContainer: {
    flex: 1,
    backgroundColor: "#EDF2FB",
  },
});
>>>>>>> origin/arsat
