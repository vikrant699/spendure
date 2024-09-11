import { FC, useState, useRef } from "react";
import { Button, TextInput } from "react-native-paper";
import { View } from "react-native";
import { RouteProp, CommonActions } from "@react-navigation/native";

import AppleSignIn from "./components/AppleSignIn/AppleSignIn";
import GoogleSignInOAuth from "./components/GoogleSignInOAuth/GoogleSignInOAuth";
import GoogleSignInNative from "./components/GoogleSignInNative/GoogleSignInNative";
import CustomDialog, {
  CustomDialogHandles,
} from "../../common/components/CustomDialog";
import { NavigationOnlyProps } from "../../common/typesAndInterfaces/interfaces";
import { useSignInWithEmailMutation } from "../../store/apis/authApis/authApis";
import { handleSocialSignIn } from "./Auth.helpers";
import { RootStackParamList } from "../../common/typesAndInterfaces/types";
import { isIos } from "../../common/constants/constants";
import styles from "./Auth.styles";

type AuthRouteProp = RouteProp<RootStackParamList, "AuthScreen">;
interface AuthProps extends NavigationOnlyProps {
  route: AuthRouteProp;
}

const Auth: FC<AuthProps> = ({ navigation, route }) => {
  const [email, setEmail] = useState<string>("");
  const [errorOccurred, setErrorOccurred] = useState<boolean>(false);
  const errorDialogRef = useRef<CustomDialogHandles>(null);
  const [signInWithEmail, { isLoading }] = useSignInWithEmailMutation();
  const {
    params: { redirectTo, fromBottomTabs } = {
      redirectTo: "BottomTabs",
      fromBottomTabs: false,
    },
  } = route;

  const handleEmailSignIn = async () => {
    const { error } = await signInWithEmail(email);
    if (!error) {
      navigation.navigate("LinkConfirmationScreen", {
        email,
        redirectTo,
        fromBottomTabs,
      });
    } else {
      errorDialogRef.current!.showDialog("Error", "Error sending the email!");
    }
  };

  const onErrorDialogVisible = (isVisible: boolean) => {
    setErrorOccurred(isVisible);
  };

  return (
    <View style={styles.container}>
      <CustomDialog
        ref={errorDialogRef}
        onVisibilityChange={onErrorDialogVisible}
      />
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextInput
          label="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button disabled={isLoading} onPress={handleEmailSignIn}>
          Sign In
        </Button>
      </View>
      {errorOccurred && !redirectTo && (
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Button
            disabled={isLoading}
            onPress={() =>
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: "BottomTabs" }],
                })
              )
            }
          >
            Skip
          </Button>
        </View>
      )}
      <AppleSignIn
        handleSignIn={handleSocialSignIn}
        errorDialog={errorDialogRef.current!}
        redirectTo={redirectTo}
        fromBottomTabs={fromBottomTabs}
      />
      {isIos ? (
        <GoogleSignInOAuth
          handleSignIn={handleSocialSignIn}
          errorDialog={errorDialogRef.current!}
          redirectTo={redirectTo}
          fromBottomTabs={fromBottomTabs}
        />
      ) : (
        <GoogleSignInNative
          handleSignIn={handleSocialSignIn}
          errorDialog={errorDialogRef.current!}
          redirectTo={redirectTo}
          fromBottomTabs={fromBottomTabs}
        />
      )}
    </View>
  );
};

export default Auth;
