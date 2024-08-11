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

import { NavigationOnlyProps } from "../../common/interfaces";
import { useAppDispatch } from "../../store/hooks";
import { login } from "../../store/slices/authSlice";
import { useCreateSessionFromUrlMutation } from "../../store/apis/authApis";

const LinkConfirmation: FC<NavigationOnlyProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const [createSessionFromUrl, { isLoading, error }] =
    useCreateSessionFromUrlMutation();
  const url = Linking.useURL();

  useEffect(() => {
    const verifyEmail = async () => {
      if (url) {
        const result = await createSessionFromUrl(url);
        console.log(result);
        console.log(url);
        if (!result.error) {
          dispatch(login(result.data));
          navigation.replace("Home");
        }
      }
    };

    verifyEmail();
  }, [url]);

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
