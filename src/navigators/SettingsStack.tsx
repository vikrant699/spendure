import { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createNativeStackNavigator();

const SettingsStack: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
      })}
      initialRouteName="Settings"
    >
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default SettingsStack;
