import { FC, useEffect } from "react";
import { Button } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import { supabase } from "../../common/supabase"; // Replace with your actual supabase client path

const GoogleSignIn: FC = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    clientId: process.env.EXPO_PUBLIC_GOOGLE_EXPO_CLIENT_ID,
    redirectUri: AuthSession.makeRedirectUri(),
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      // Exchange the token for a session in Supabase
      signInWithGoogle(authentication?.accessToken);
    }
  }, [response]);

  const signInWithGoogle = async (accessToken) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      accessToken: accessToken,
    });

    if (error) {
      console.error("Error during Google login", error.message);
    } else {
      console.log("Logged in with Google", data);
    }
  };

  return (
    <Button
      disabled={!request}
      title="Login with Google"
      onPress={() => promptAsync()}
    />
  );
};

export default GoogleSignIn;
