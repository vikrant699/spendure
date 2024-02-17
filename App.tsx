import { FC } from "react";
import { StatusBar } from "expo-status-bar";
import { PaperProvider, MD3DarkTheme } from "react-native-paper";
import { MD3Theme , MD3Colors } from "react-native-paper/lib/typescript/types";
import { NavigationContainer } from "@react-navigation/native";
import NativeStackNavigator from "./src/navigators/NativeStackNavigator";

interface DefaultThemeColors extends MD3Colors {
    card: string;
    text: string;
    border: string;
    notification: string;
}

interface DefaultTheme extends MD3Theme {
  colors: DefaultThemeColors
}

const theme: DefaultTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    card: '#BADA55',
    text: '#BADA55',
    border: '#BADA55',
    notification: '#BADA55',
  },
};


const App: FC = () => {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <NativeStackNavigator />
        <StatusBar style="light" />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
