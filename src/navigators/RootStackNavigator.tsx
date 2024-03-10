import { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";
import AddTransactionStack from "./AddTransactionStack";
import TransactionsScreen from "../screens/TransactionsScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createNativeStackNavigator();

const RootStack: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation, route }) => ({
        headerShown: false,
      })}
      initialRouteName="BottomTabs"
    >
      <Stack.Group>
        <Stack.Screen name="BottomTabs" component={BottomTabNavigator} />
        <Stack.Screen
          name="Transactions"
          component={TransactionsScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ headerShown: true }}
        />
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
