import { FC } from "react";
import { View, StyleSheet } from "react-native";
import { useAppSelector } from "../store/hooks";
import { NavigationOnlyProps } from "../types/interfaces";
import Card from "../components/Card";

const HomeScreen: FC<NavigationOnlyProps> = ({ navigation }) => {
  const accounts = useAppSelector((state) => state.accounts);

  const handlePress = () => {
    navigation.navigate("Transactions");
  };

  return (
    <View style={styles.container}>
      {Object.values(accounts).map((account) => (
        <Card
          key={account.accountId}
          onPress={handlePress}
          balance={account.accountBalance}
          name={account.accountName}
        />
      ))}
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
