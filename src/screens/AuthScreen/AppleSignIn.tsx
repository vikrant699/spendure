import { FC } from "react";
import * as AppleAuthentication from "expo-apple-authentication";
import { Platform, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../../store/hooks";
import { NavigationType } from "../../common/types";
import { useAppleSignInMutation } from "../../store/apis/authApis";

const AppleSignIn: FC = () => {
  const navigation: NavigationType = useNavigation();
  const [appleSignIn, { isLoading, error }] = useAppleSignInMutation();
  const dispatch = useAppDispatch();

  return (
    <>
      {Platform.OS === "ios" ? (
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={5}
          style={styles.button}
          onPress={async () => {
            await appleSignIn(navigation);
          }}
        />
      ) : (
        // To do for Android
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
