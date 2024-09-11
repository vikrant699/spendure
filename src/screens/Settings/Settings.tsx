import { FC } from "react";
import { Button } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";

import { NavigationOnlyProps } from "../../common/typesAndInterfaces/interfaces";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useSignOutMutation } from "../../store/apis/authApis/authApis";
import { logout } from "../../store/slices/authSlice";
import { HomeStackParamList } from "../../common/typesAndInterfaces/types";

type SettingsRouteProp = RouteProp<HomeStackParamList, "Settings">;
interface SettingsProps extends NavigationOnlyProps {
  route: SettingsRouteProp;
}

const Settings: FC<SettingsProps> = ({ navigation, route }) => {
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector((state) => state.auth.loggedIn);
  const [signOut, { isLoading, error }] = useSignOutMutation();
  const { name } = route;

  const handleSignOut = async () => {
    await signOut();
    dispatch(logout());
  };

  const handleSignInClick = () => {
    navigation.navigate("AuthStack", { redirectTo: name });
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
