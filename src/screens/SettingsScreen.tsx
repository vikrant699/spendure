import { FC } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { NavigationOnlyProps } from "../types/interfaces";

const SettingsScreen: FC<NavigationOnlyProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Settings!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SettingsScreen;
