import { FC } from "react";
import { StatusBar } from "expo-status-bar";
import { PaperProvider, MD3DarkTheme } from "react-native-paper";
import { MD3Theme, MD3Colors } from "react-native-paper/lib/typescript/types";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./src/navigators/BottomTabNavigator";

interface DefaultThemeColors extends MD3Colors {
  card: string;
  text: string;
  border: string;
  notification: string;
}

interface DefaultTheme extends MD3Theme {
  colors: DefaultThemeColors;
}

const theme: DefaultTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    card: MD3DarkTheme.colors.surface,
    text: MD3DarkTheme.colors.primary,
    border: MD3DarkTheme.colors.surface,
    notification: MD3DarkTheme.colors.surface,
  },
};

const App: FC = () => {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <BottomTabNavigator />
        <StatusBar style="light" />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
