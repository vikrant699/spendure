import { FC } from "react";
import { useNavigation } from "@react-navigation/native";

import { useGoogleSignInNativeMutation } from "../../../../store/apis/authApis/authApis";
import { useAppDispatch } from "../../../../store/hooks";
import { NavigationType } from "../../../../common/typesAndInterfaces/types";
import { GoogleSigninButton } from "../../../../common/libraries/googleSignInNative";
import { SignInComponentProps } from "../../typesAndInterfaces/interfaces";

const GoogleSignInNative: FC<SignInComponentProps> = ({
  handleSignIn,
  errorDialog,
  redirectTo,
}) => {
  const navigation: NavigationType = useNavigation();
  const dispatch = useAppDispatch();
  const [googleSignInNative] = useGoogleSignInNativeMutation();

  const handleGoogleSignIn = () => {
    handleSignIn(
      googleSignInNative as () => Promise<{
        data: any;
        error: any;
      }>,
      "google",
      navigation,
      dispatch,
      errorDialog,
      redirectTo
    );
  };

  return (
    <>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={handleGoogleSignIn}
      />
    </>
  );
};

export default GoogleSignInNative;
