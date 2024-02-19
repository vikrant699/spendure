import { FC } from "react";
import { View, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/routers";
import Card from "../components/Card";
interface Props {
  navigation: NativeStackNavigationProp<ParamListBase>;
}

const HomeScreen: FC<Props> = ({ navigation }) => {
  const handlePress = () => {
    navigation.navigate("Transactions");
  };

  return (
    <View style={styles.container}>
      <Card onPress={handlePress} />
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
