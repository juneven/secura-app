import { Switch, Text, TouchableOpacity, View } from "react-native";
import styles from "./settingsStyles";

export default function GeneralSection({
  largeText,
  setLargeText,
  saveHistory,
  setSaveHistory,
  handleClearHistory,
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>General</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.rowText}>
            <Text style={styles.itemTitle}>Large Text</Text>
            <Text style={styles.itemSubtitle}>
              Make text bigger and easier to read
            </Text>
          </View>
          <Switch
            value={largeText}
            onValueChange={setLargeText}
            trackColor={{ false: "#D3DEF3", true: "#4E8DF8" }}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <View style={styles.rowText}>
            <Text style={styles.itemTitle}>Save History</Text>
            <Text style={styles.itemSubtitle}>
              Keep a records of link you&apos;ve checked
            </Text>
          </View>
          <Switch
            value={saveHistory}
            onValueChange={setSaveHistory}
            trackColor={{ false: "#D3DEF3", true: "#4E8DF8" }}
          />
        </View>

        <View style={styles.divider} />

        <TouchableOpacity
          style={styles.rowAction}
          activeOpacity={0.7}
          onPress={handleClearHistory}
        >
          <Text style={styles.dangerTitle}>Clear History</Text>
          <Text style={styles.itemSubtitle}>Remove all saved link checks</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
