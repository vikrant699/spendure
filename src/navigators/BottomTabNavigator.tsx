import { FC } from "react";
import { CommonActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation } from "react-native-paper";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import HomeScreen from "../screens/Home/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import AddTransactionButton from "../components/AddTransactionButton";

const Tab = createBottomTabNavigator();

const DummyComponent: FC = () => null;

const BottomTabNavigator: FC = () => {
  return (
    <>
      <AddTransactionButton />
      <Tab.Navigator
        screenOptions={{
          headerShown: true,
        }}
        tabBar={({ navigation, state, descriptors, insets }) => (
          <BottomNavigation.Bar
            shifting={true}
            navigationState={state}
            safeAreaInsets={insets}
            onTabPress={({ route, preventDefault }) => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });
              if (event.defaultPrevented) {
                preventDefault();
              } else {
                navigation.dispatch({
                  ...CommonActions.navigate(route.name, route.params),
                  target: state.key,
                });
              }
            }}
            renderIcon={({ route, focused, color }) => {
              const { options } = descriptors[route.key];
              if (options.tabBarIcon) {
                return options.tabBarIcon({ focused, color, size: 24 });
              }
              return null;
            }}
            getLabelText={({ route }) => {
              const { options } = descriptors[route.key];
              return options.tabBarLabel as string;
            }}
          />
        )}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => {
              return (
                <MaterialCommunityIcon name="home" size={size} color={color} />
              );
            },
          }}
        />
        <Tab.Screen
          name="Dummy"
          component={DummyComponent}
          options={{
            tabBarLabel: "",
            tabBarIcon: () => {
              return <></>;
            },
          }}
          listeners={{
            tabPress: ({ preventDefault }) => {
              preventDefault();
            },
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarLabel: "Settings",
            tabBarIcon: ({ color, size }) => {
              return (
                <MaterialCommunityIcon name="cog" size={size} color={color} />
              );
            },
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default BottomTabNavigator;
