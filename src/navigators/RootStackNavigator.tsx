import { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TransactionsScreen from "../screens/TransactionsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import AddTransactionStack from "./AddTransactionStack";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createNativeStackNavigator();

const RootStack: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
      })}
      initialRouteName="Home"
    >
      <Stack.Group>
        <Stack.Screen name="Home" component={BottomTabNavigator} />
        <Stack.Screen name="Transactions" component={TransactionsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          presentation: "modal",
          animation: "slide_from_bottom",
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="AddTransactionStack"
          component={AddTransactionStack}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default RootStack;
