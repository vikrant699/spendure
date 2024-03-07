import { FC } from "react";
import { View, StyleSheet } from "react-native";
import Card from "../components/Card";
import { NavigationOnlyProps } from "../types/interfaces";

const AddTrasactionScreen: FC<NavigationOnlyProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Card onPress={() => navigation.navigate("TransactionCategory")} />
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

export default AddTrasactionScreen;
