import { FC } from "react";
import { View, StyleSheet } from "react-native";
import { Text, withTheme } from "react-native-paper";

const SettingsScreen: FC = () => {
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

export default withTheme(SettingsScreen);
