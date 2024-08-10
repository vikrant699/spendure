import { FC } from "react";
import * as AppleAuthentication from "expo-apple-authentication";
import { Platform, StyleSheet } from "react-native";
import { makeRedirectUri } from "expo-auth-session";

import { supabase } from "../../common/supabase";

const AppleSignIn: FC = () => {
  const redirectTo = makeRedirectUri();

  return (
    <>
      {Platform.OS === "ios" ? (
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={5}
          style={styles.button}
          onPress={async () => {
            try {
              const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                  AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                  AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
              });
              // Sign in via Supabase Auth.
              if (credential.identityToken) {
                const {
                  error,
                  data: { user },
                } = await supabase.auth.signInWithIdToken({
                  provider: "apple",
                  token: credential.identityToken,
                });
                console.log(JSON.stringify({ error, user }, null, 2));
                if (!error) {
                  // User is signed in.
                }
              } else {
                throw new Error("No identityToken.");
              }
            } catch (e: any) {
              if (e.code === "ERR_REQUEST_CANCELED") {
                // handle that the user canceled the sign-in flow
              } else {
                // handle other errors
              }
            }
          }}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default AppleSignIn;

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 44,
  },
});
