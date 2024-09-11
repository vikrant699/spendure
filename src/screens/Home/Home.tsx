import { FC } from "react";
import { View } from "react-native";

import { useAppSelector } from "../../store/hooks";
import { NavigationOnlyProps } from "../../common/typesAndInterfaces/interfaces";
import Card from "../../common/components/Card";
import styles from "./Home.styles";

const Home: FC<NavigationOnlyProps> = ({ navigation }) => {
  const accounts = useAppSelector((state) => state.accounts);

  const handleAccountPress = () => {
    navigation.navigate("Transactions");
  };

  const handleAddAccount = () => {
    navigation.navigate("AddAccountScreen");
  };

  return (
    <View style={styles.container}>
      {Object.values(accounts).map((account) => (
        <Card
          key={account.id}
          onPress={handleAccountPress}
          balance={account.accountBalance}
          name={account.name}
          addAccount={false}
        />
      ))}
      <Card onPress={handleAddAccount} addAccount={true} />
    </View>
  );
};

export default Home;
