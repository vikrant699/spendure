import { FC } from "react";
import { StatusBar } from "expo-status-bar";
import { PaperProvider, MD3DarkTheme } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabs from "./src/navigators/BottomTabNavigator";

const App: FC = () => {
  return (
    <PaperProvider theme={MD3DarkTheme}>
      <NavigationContainer theme={MD3DarkTheme}>
        <BottomTabs />
        <StatusBar style="light" />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
