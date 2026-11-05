import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Image, Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomTabBar from "../components/BottomTabBar";
import HistoryScreen from "../screens/HistoryScreen.jsx";
import HomeScreen from "../screens/HomeScreen.jsx";
import Onboarding1Screen from "../screens/onboarding/Onboarding1Screen.jsx";
import Onboarding2Screen from "../screens/onboarding/Onboarding2Screen.jsx";
import Onboarding3Screen from "../screens/onboarding/Onboarding3Screen.jsx";
import SettingsScreen from "../screens/settings/SettingsScreen.jsx";
import UserDetailScreen from "../screens/settings/UserDetailScreen.jsx";

export default function Index() {
  const [appFlow, setAppFlow] = useState("intro");
  const [currentView, setCurrentView] = useState("home");

  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (Platform.OS === "web" && typeof document !== "undefined") {
      const fontId = "montserrat-alternates-font";
      if (!document.getElementById(fontId)) {
        const link = document.createElement("link");
        link.id = fontId;
        link.rel = "stylesheet";
        link.href = "https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@700;800;900&display=swap";
        document.head.appendChild(link);
      }
    }
  }, []);

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

  if (appFlow !== "main") {
    return (
      <SafeAreaView style={styles.introOnboardingContainer}>
        <StatusBar style="light" />

        {appFlow === "intro" && (
          <View style={styles.introContainer}>
            <View style={styles.topSpacer} />
            <View style={styles.introCenterSection}>
              <Image source={require("../../assets/images/intro-logo.png")} style={styles.introLogo} resizeMode="contain" />
              <Text style={styles.introSlogan}>Recognize, Check, Protect.</Text>
              <View style={styles.progressBarTrack}>
                <Animated.View style={[styles.progressBarFill, { width: progressWidth }]} />
              </View>
            </View>
            <View style={styles.introBottomSection}>
              <Text style={styles.introBrandName}>SECURA</Text>
            </View>
          </View>
        )}

        {appFlow === "onboarding-1" && <Onboarding1Screen onNext={() => setAppFlow("onboarding-2")} />}

        {appFlow === "onboarding-2" && <Onboarding2Screen onNext={() => setAppFlow("onboarding-3")} />}

        {appFlow === "onboarding-3" && (
          <Onboarding3Screen
            onFinish={() => {
              setAppFlow("main");
              setCurrentView("home");
            }}
          />
        )}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar style="dark" />

      {currentView === "home" && <HomeScreen />}
      {currentView === "history" && <HistoryScreen />}
      {currentView === "settings" && <SettingsScreen onNavigateToUserDetail={() => setCurrentView("user-detail")} />}
      {currentView === "user-detail" && <UserDetailScreen onBack={() => setCurrentView("settings")} />}

      <BottomTabBar activeTab={currentView === "user-detail" ? "settings" : currentView} onTabChange={(tab) => setCurrentView(tab)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  mainContainer: {
    flex: 1,
    backgroundColor: "#EDF2FB",
  },
});