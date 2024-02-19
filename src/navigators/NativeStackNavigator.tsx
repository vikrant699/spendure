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
        // header: ({ route }) => <CustomNavigationBar route={route} />,
      }}
      initialRouteName="BottomTabsStack">
      <Stack.Screen name="BottomTabsStack" component={BottomTabNavigator} options={{ title: 'Home' }}/>
      <Stack.Screen name="Transactions" component={TransactionsScreen} />
    </Stack.Navigator>
  );
};

export default NativeStackNavigator;
