import { FC } from "react";
import { View, StyleSheet } from "react-native";
import { useAppSelector } from "../store/hooks";
import { NavigationOnlyProps } from "../types/interfaces";
import Card from "../components/Card";

const HomeScreen: FC<NavigationOnlyProps> = ({ navigation }) => {
  const amount = useAppSelector((state) => state.accounts.accountBalance);

  const handlePress = () => {
    navigation.navigate("Transactions");
  };

  return (
    <View style={styles.container}>
      <Card onPress={handlePress} amount={amount} />
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

export default HomeScreen;
