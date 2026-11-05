import { Image, View } from "react-native";
import styles from "./homeStyles";

export default function HomeHeader() {
  return (
    <View style={styles.header}>
      <Image
        source={require("../../../assets/images/secura-logo.png")}
        style={styles.logo}
        resizeMode="cover"
      />
    </View>
  );
}
