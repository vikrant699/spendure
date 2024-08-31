import { FC, useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { View, StyleSheet, Text, Platform } from "react-native";

import AppleSignIn from "./AppleSignIn";
import GoogleSignIn from "./GoogleSignIn";
import GoogleSignInAndroid from "./GoogleSignInAndroid";
import { NavigationOnlyProps } from "../../common/interfaces";
import { useSignInWithEmailMutation } from "../../store/apis/authApis";

const Auth: FC<NavigationOnlyProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");

  const [signInWithEmail, { isLoading, error }] = useSignInWithEmailMutation();

  const handleSignIn = async () => {
    const result = await signInWithEmail(email);
    if ("data" in result) {
      navigation.navigate("LinkConfirmation");
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextInput
          label="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
        />
      </View>
      {error && <Text style={{ color: "red" }}>{(error as any).data}</Text>}
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button disabled={isLoading} onPress={handleSignIn}>
          Sign In
        </Button>
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button disabled={isLoading} onPress={() => navigation.replace("Home")}>
          Skip
        </Button>
      </View>
      <AppleSignIn />
     {Platform.OS === 'ios' ? <GoogleSignIn /> : <GoogleSignInAndroid/>}
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
