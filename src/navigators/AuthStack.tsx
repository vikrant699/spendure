import { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "../screens/AuthScreen/AuthScreen";
import LinkConfirmation from "../screens/AuthScreen/LinkConfirmationScreen";
import RootStack from "./RootStackNavigator";

const Stack = createNativeStackNavigator();

const AuthStack: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation, route }) => ({
        headerShown: false,
      })}
      initialRouteName="Authentication"
    >
      <Stack.Screen
        name="Authentication"
        component={AuthScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="LinkConfirmation"
        component={LinkConfirmation}
        options={{ headerShown: true }}
      />
      <Stack.Screen name="Home" component={RootStack} />
    </Stack.Navigator>
  );
};

export default AuthStack;
