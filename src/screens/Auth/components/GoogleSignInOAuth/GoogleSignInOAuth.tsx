import { FC } from "react";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuthRequest } from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";

import { useGoogleSignInOAuthMutation } from "../../../../store/apis/authApis/authApis";
import { useAppDispatch } from "../../../../store/hooks";
import { NavigationType } from "../../../../common/typesAndInterfaces/types";
import { SignInComponentProps } from "../../typesAndInterfaces/interfaces";

const GoogleSignInOAuth: FC<SignInComponentProps> = ({
  handleSignIn,
  errorDialog,
  redirectTo,
  fromBottomTabs,
}) => {
  const navigation: NavigationType = useNavigation();
  const [_, response, promptAsync] = useAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    redirectUri: makeRedirectUri({ scheme: "com.spendure.app" }),
  });
  const dispatch = useAppDispatch();
  const [googleSignInOAuth] = useGoogleSignInOAuthMutation();

  const handleGoogleSignIn = async () => {
    await promptAsync();
    handleSignIn(
      (() => googleSignInOAuth(response)) as () => Promise<{
        data: any;
        error: any;
      }>,
      "google",
      navigation,
      dispatch,
      errorDialog,
      redirectTo,
      fromBottomTabs
    );
  };

  return <Button title="Login with Google" onPress={handleGoogleSignIn} />;
};

export default GoogleSignInOAuth;
