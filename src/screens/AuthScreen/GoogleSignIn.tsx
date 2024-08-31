import { FC, useEffect } from "react";
import { Button } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import { supabase } from "../../common/supabase"

const GoogleSignIn: FC = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    redirectUri: AuthSession.makeRedirectUri({ scheme: 'com.spendure.app' }),
  });

  // console.log(response)

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: "google",
      token: response.params.id_token,
      access_token: response.params.access_token,
    });

    if (error) {
      console.error("Error during Google login", error.message);
    } else {
      console.log("Logged in with Google", data);
    }
  };

  useEffect(() => {
    if (response?.type === "success") {
      signInWithGoogle();
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title="Login with Google"
      onPress={() => promptAsync()}
    />
  );
};

export default GoogleSignIn;
