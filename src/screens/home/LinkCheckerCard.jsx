import { Ionicons } from "@expo/vector-icons";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./homeStyles";

export default function LinkCheckerCard({ linkInput, setLinkInput, handleCheckLink }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Is this link safe?</Text>
      <Text style={styles.cardSubtitle}>Check a link before you click</Text>

      {/* Input Box */}
      <View style={styles.inputBox}>
        <Ionicons
          name="link-outline"
          size={22}
          color="#8DB6F8"
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Paste a link here"
          placeholderTextColor="#A3BEE8"
          value={linkInput}
          onChangeText={setLinkInput}
          multiline
        />
      </View>

      {/* Tombol Check Link */}
      <TouchableOpacity
        style={styles.checkButton}
        activeOpacity={0.85}
        onPress={handleCheckLink}
      >
        <Text style={styles.checkButtonText}>Check Link</Text>
      </TouchableOpacity>

      {/* Tombol Share a link from another app */}
      <TouchableOpacity
        style={styles.shareButton}
        activeOpacity={0.85}
        onPress={() =>
          setLinkInput("https://secured-check.org/i/verify-apk-download")
        }
      >
        <Ionicons
          name="share-outline"
          size={18}
          color="#4E8DF8"
          style={{ marginRight: 6 }}
        />
        <Text style={styles.shareButtonText}>
          Share a link from another app
        </Text>
      </TouchableOpacity>
    </View>
  );
}