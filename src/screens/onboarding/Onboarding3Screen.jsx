import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./onBoardingStyles.js";

export default function Onboarding3Screen({ onFinish }) {
  return (
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
          source={require("../../../assets/images/onboarding-3.png")}
          style={styles.illustrationImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.85}
          onPress={onFinish}
        >
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
