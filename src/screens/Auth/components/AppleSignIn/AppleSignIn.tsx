import { FC } from "react";
import * as AppleAuthentication from "expo-apple-authentication";
import { Platform, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useAppDispatch } from "../../../../store/hooks";
import { NavigationType } from "../../../../common/typesAndInterfaces/types";
import { useAppleSignInMutation } from "../../../../store/apis/authApis/authApis";
import { SignInComponentProps } from "../../typesAndInterfaces/interfaces";
import { isIos } from "../../../../common/constants/constants";

const AppleSignIn: FC<SignInComponentProps> = ({
  handleSignIn,
  errorDialog,
  redirectTo,
}) => {
  const navigation: NavigationType = useNavigation();
  const [appleSignIn] = useAppleSignInMutation();
  const dispatch = useAppDispatch();

  const handleAppleSignIn = () => {
    handleSignIn(
      appleSignIn as () => Promise<{ data: any; error: any }>,
      "apple",
      navigation,
      dispatch,
      errorDialog,
      redirectTo
    );
  };

  return (
    <>
      {isIos ? (
        <>
          <AppleAuthentication.AppleAuthenticationButton
            buttonType={
              AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
            }
            buttonStyle={
              AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
            }
            cornerRadius={5}
            style={styles.button}
            onPress={handleAppleSignIn}
          />
        </>
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
