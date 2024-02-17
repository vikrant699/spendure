import { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";
import TransactionsScreen from "../screens/TransactionsScreen";
import CustomNavigationBar from "./Header";

const Stack = createNativeStackNavigator();

const NativeStackNavigator: FC = () => {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: true,
        header: ({ route }) => <CustomNavigationBar route={route} />,
      }}>
      <Stack.Screen name="BottomTabsScreen" component={BottomTabNavigator} />
      <Stack.Screen name="TransactionsScreen" component={TransactionsScreen} />
    </Stack.Navigator>
  );
};

export default NativeStackNavigator;
