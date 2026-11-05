import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./onBoardingStyles.js";

export default function Onboarding1Screen({ onNext }) {
  return (
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
          source={require("../../../assets/images/onboarding-1.png")}
          style={styles.illustrationImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.85}
          onPress={onNext}
        >
          <Text style={styles.primaryButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
