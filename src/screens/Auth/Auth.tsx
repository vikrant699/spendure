import { FC, useState, useRef } from "react";
import { Button, TextInput } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";

import AppleSignIn from "./components/AppleSignIn/AppleSignIn";
import GoogleSignInOAuth from "./components/GoogleSignInOAuth/GoogleSignInOAuth";
import GoogleSignInNative from "./components/GoogleSignInNative/GoogleSignInNative";
import CustomDialog, {
  CustomDialogHandles,
} from "../../common/components/CustomDialog";
import { NavigationOnlyProps } from "../../common/typesAndInterfaces/interfaces";
import { useSignInWithEmailMutation } from "../../store/apis/authApis/authApis";
import { handleSocialSignIn } from "./Auth.helpers";
import { AuthStackParamList } from "../../common/typesAndInterfaces/types";
import { isIos } from "../../common/constants/constants";

type AuthRouteProp = RouteProp<AuthStackParamList, "AuthScreen">;
interface AuthProps extends NavigationOnlyProps {
  route: AuthRouteProp;
}

const Auth: FC<AuthProps> = ({ navigation, route }) => {
  const [email, setEmail] = useState<string>("");
  const [errorOccurred, setErrorOccurred] = useState<boolean>(false);
  const errorDialogRef = useRef<CustomDialogHandles>(null);
  const [signInWithEmail, { isLoading, error }] = useSignInWithEmailMutation();
  const {
    params: { redirectTo },
  } = route;

  const handleEmailSignIn = async () => {
    await signInWithEmail(email);
    if (!error) {
      navigation.navigate("LinkConfirmationScreen", { email, redirectTo });
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
            onPress={() => navigation.replace("HomeStack")}
          >
            Skip
          </Button>
        </View>
      )}
      <AppleSignIn
        handleSignIn={handleSocialSignIn}
        errorDialog={errorDialogRef.current!}
        redirectTo={redirectTo}
      />
      {isIos ? (
        <GoogleSignInOAuth
          handleSignIn={handleSocialSignIn}
          errorDialog={errorDialogRef.current!}
          redirectTo={redirectTo}
        />
      ) : (
        <GoogleSignInNative
          handleSignIn={handleSocialSignIn}
          errorDialog={errorDialogRef.current!}
          redirectTo={redirectTo}
        />
      )}
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

export default Auth;
