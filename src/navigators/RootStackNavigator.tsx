import { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Auth from "../screens/Auth/Auth";
import LinkConfirmation from "../screens/LinkConfirmation/LinkConfirmation";
import BottomTabNavigator from "./BottomTabNavigator";
import AddTransactionStack from "./AddTransactionStack";
import Settings from "../screens/Settings/Settings";
import AddAccount from "../screens/AddAccount/AddAccount";
import Splash from "../screens/Splash/Splash";
import { RootStackParamList } from "../common/typesAndInterfaces/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation, route }) => ({
        headerShown: false,
      })}
      initialRouteName="SplashScreen"
    >
      <Stack.Screen name="SplashScreen" component={Splash} />
      <Stack.Screen name="AuthScreen" component={Auth} />
      <Stack.Screen
        name="LinkConfirmationScreen"
        component={LinkConfirmation}
        options={{ headerShown: true }}
      />
      <Stack.Screen name="BottomTabs" component={BottomTabNavigator} />
      <Stack.Screen
        name="SettingsScreen"
        component={Settings}
        options={{ headerShown: true }}
      />
      <Stack.Group
        screenOptions={{
          presentation: "modal",
          animation: "slide_from_bottom",
          headerShown: true,
        }}
      >
        <Stack.Screen
          name="AddTransactionStack"
          component={AddTransactionStack}
        />
        <Stack.Screen name="AddAccountScreen" component={AddAccount} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default RootStack;
