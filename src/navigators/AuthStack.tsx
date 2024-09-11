import { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthScreen from "../screens/Auth/Auth";
import LinkConfirmation from "../screens/LinkConfirmation/LinkConfirmation";
import { AuthStackParamList } from "../common/typesAndInterfaces/types";

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation, route }) => ({
        headerShown: false,
      })}
      initialRouteName="AuthScreen"
    >
      <Stack.Screen name="AuthScreen" component={AuthScreen} />
      <Stack.Screen
        name="LinkConfirmationScreen"
        component={LinkConfirmation}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
