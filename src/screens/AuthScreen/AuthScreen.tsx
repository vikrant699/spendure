import { FC, useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { View, StyleSheet } from "react-native";

import AppleSignIn from "./AppleSignIn";
import { NavigationOnlyProps } from "../../common/interfaces";
import { useAppDispatch } from "../../store/hooks";
import { signInWithEmail } from "../../store/slices/authSlice";

const Auth: FC<NavigationOnlyProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const handleSignIn = async () => {
    setLoading(true);
    setError(null);
    const resultAction = await dispatch(signInWithEmail({ email, navigation }));
    if (signInWithEmail.rejected.match(resultAction)) {
      setError(resultAction.payload as string);
    }
    setLoading(false);
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
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button disabled={loading} onPress={handleSignIn}>
          Sign In
        </Button>
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button disabled={loading} onPress={() => navigation.replace("Home")}>
          Skip
        </Button>
      </View>
      <AppleSignIn />
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
