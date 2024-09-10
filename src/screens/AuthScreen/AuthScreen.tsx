import { FC, useState, useRef } from "react";
import { Button, TextInput } from "react-native-paper";
import { View, StyleSheet, Text, Platform } from "react-native";

import AppleSignIn from "./components/AppleSignIn/AppleSignIn";
import GoogleSignInOAuth from "./components/GoogleSignInOAuth/GoogleSignInOAuth";
import GoogleSignInNative from "./components/GoogleSignInNative/GoogleSignInNative";
import CustomDialog, {
  CustomDialogHandles,
} from "../../common/components/CustomDialog";
import { NavigationOnlyProps } from "../../common/typesAndInterfaces/interfaces";
import { useSignInWithEmailMutation } from "../../store/apis/authApis/authApis";
import { handleSocialSignIn } from "./AuthScreen.helpers";

const Auth: FC<NavigationOnlyProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const errorDialogRef = useRef<CustomDialogHandles>(null);
  const [signInWithEmail, { isLoading, error }] = useSignInWithEmailMutation();

  const handleEmailSignIn = async () => {
    signInWithEmail(email);
    if (!error) {
      navigation.navigate("LinkConfirmation");
    } else {
      errorDialogRef.current!.showDialog("Error", "Something went wrong.");
    }
  };

  return (
    <View style={styles.container}>
      <CustomDialog ref={errorDialogRef} />
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
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button disabled={isLoading} onPress={() => navigation.replace("Home")}>
          Skip
        </Button>
      </View>
      <AppleSignIn
        handleSignIn={handleSocialSignIn}
        errorDialog={errorDialogRef.current!}
      />
      {Platform.OS === "ios" ? (
        <GoogleSignInOAuth
          handleSignIn={handleSocialSignIn}
          errorDialog={errorDialogRef.current!}
        />
      ) : (
        <GoogleSignInNative
          handleSignIn={handleSocialSignIn}
          errorDialog={errorDialogRef.current!}
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
