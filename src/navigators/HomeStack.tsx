import { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import TransactionsScreen from "../screens/TransactionsScreen";
import AddTransactionStack from "./AddTransactionStack";

const Stack = createNativeStackNavigator();

const HomeStack: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
      })}
      initialRouteName="Home"
    >
      <Stack.Group>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Transactions" component={TransactionsScreen} />
      </Stack.Group>
      <Stack.Group
        screenOptions={{ presentation: "modal", headerShown: false }}
      >
        <Stack.Screen
          name="AddTransactionStack"
          component={AddTransactionStack}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default HomeStack;
