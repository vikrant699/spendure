import { FC } from "react";
import { StatusBar } from "expo-status-bar";
import { PaperProvider, MD3DarkTheme } from "react-native-paper";
import { MD3Theme, MD3Colors } from "react-native-paper/lib/typescript/types";
import { NavigationContainer } from "@react-navigation/native";
import NativeStackNavigator from "./src/navigators/NativeStackNavigator";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer theme={theme}>
            <NativeStackNavigator />
            <StatusBar style="light" />
          </NavigationContainer>
        </PaperProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default App;
