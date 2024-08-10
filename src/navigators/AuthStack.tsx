import { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "../screens/AuthScreen/AuthScreen";

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
    </Stack.Navigator>
  );
};

export default AuthStack;
