import { FC, useEffect } from "react";
import { Text, Button } from "react-native-paper";
import {
  Linking as AppLinking,
  Platform,
  View,
  StyleSheet,
} from "react-native";
import * as Linking from "expo-linking";
import * as IntentLauncher from "expo-intent-launcher";

import { useAppDispatch } from "../../store/hooks";
import { NavigationOnlyProps } from "../../common/interfaces";
import { useAppSelector } from "../../store/hooks";
import { createSessionFromUrl } from "../../store/slices/authSlice";

const LinkConfirmation: FC<NavigationOnlyProps> = ({ navigation }) => {
  const loggedIn = useAppSelector((state) => state.auth.loggedIn);
  const dispatch = useAppDispatch();
  const url = Linking.useURL();

  useEffect(() => {
    if (url) {
      dispatch(createSessionFromUrl(url));
    }
  }, [dispatch, url]);

  useEffect(() => {
    if (loggedIn) {
      navigation.navigate("Home");
    }
  }, [loggedIn, navigation]);

  const openEmailApp = () => {
    if (Platform.OS === "android") {
      const activityAction = "android.intent.action.MAIN";
      const intentParams: IntentLauncher.IntentLauncherParams = {
        category: "android.intent.category.APP_EMAIL",
      };
      IntentLauncher.startActivityAsync(activityAction, intentParams);
    } else if (Platform.OS === "ios") {
      AppLinking.openURL("message://");
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Text>Link to verify sent to your email.</Text>
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button>Resend Link</Button>
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button onPress={openEmailApp}>Open Mail App</Button>
      </View>
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

export default LinkConfirmation;
