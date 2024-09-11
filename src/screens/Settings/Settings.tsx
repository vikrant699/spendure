import { FC, useRef } from "react";
import { Button } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";

import { NavigationOnlyProps } from "../../common/typesAndInterfaces/interfaces";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useSignOutMutation } from "../../store/apis/authApis/authApis";
import { logout } from "../../store/slices/authSlice";
import { RootStackParamList } from "../../common/typesAndInterfaces/types";

type SettingsRouteProp = RouteProp<RootStackParamList, "SettingsScreen">;
interface SettingsProps extends NavigationOnlyProps {
  route: SettingsRouteProp;
}

const Settings: FC<SettingsProps> = ({ navigation, route }) => {
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector((state) => state.auth.loggedIn);
  const [signOut, { isLoading, error }] = useSignOutMutation();

  const { name, params: { fromBottomTabs } = { fromBottomTabs: false } } =
    route;

  const handleSignOut = async () => {
    try {
      await signOut();
      dispatch(logout());
    } catch {
      // to do
    }
  };

  const handleSignInClick = () => {
    navigation.navigate("AuthScreen", { redirectTo: name, fromBottomTabs });
  };

  return (
    <View style={[styles.verticallySpaced, styles.mt20]}>
      {loggedIn ? (
        <Button disabled={isLoading} onPress={handleSignOut}>
          Sign Out
        </Button>
      ) : (
        <Button disabled={isLoading} onPress={handleSignInClick}>
          Sign In
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});

export default Settings;
