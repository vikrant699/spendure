import { FC, useEffect, useRef, useState } from "react";
import { Text, Button } from "react-native-paper";
import { Linking as AppLinking, View, StyleSheet } from "react-native";
import { useURL } from "expo-linking";
import { IntentLauncherParams, startActivityAsync } from "expo-intent-launcher";
import { RouteProp } from "@react-navigation/native";

import { NavigationOnlyProps } from "../../common/typesAndInterfaces/interfaces";
import { useAppDispatch } from "../../store/hooks";
import { login } from "../../store/slices/authSlice";
import {
  useCreateSessionFromUrlMutation,
  useSignInWithEmailMutation,
} from "../../store/apis/authApis/authApis";
import { storeOnboardingType } from "../../store/thunks/authThunks";
import CustomDialog, {
  CustomDialogHandles,
} from "../../common/components/CustomDialog";
import { AuthStackParamList } from "../../common/typesAndInterfaces/types";
import { isIos, isAndroid } from "../../common/constants/constants";

type LinkConfirmationRouteProp = RouteProp<
  AuthStackParamList,
  "LinkConfirmationScreen"
>;
interface LinkConfirmationProps extends NavigationOnlyProps {
  route: LinkConfirmationRouteProp;
}

const LinkConfirmation: FC<LinkConfirmationProps> = ({ navigation, route }) => {
  const dispatch = useAppDispatch();
  const errorDialogRef = useRef<CustomDialogHandles>(null);
  const [resendClickCount, setResendClickCount] = useState<number>(0);
  const [errorOccurred, setErrorOccurred] = useState<boolean>(false);
  const [createSessionFromUrl, { isLoading, error }] =
    useCreateSessionFromUrlMutation();
  const [signInWithEmail] = useSignInWithEmailMutation();
  const url = useURL();
  const {
    params: { email, redirectTo },
  } = route;

  useEffect(() => {
    const verifyEmail = async () => {
      if (url) {
        const { data } = await createSessionFromUrl(url);
        if (!error) {
          dispatch(
            login({ userId: data.session.user?.id, loginType: "email" })
          );
          dispatch(storeOnboardingType("completed"));
          navigation.replace(redirectTo || "HomeStack");
        } else {
          setErrorOccurred(true);
          errorDialogRef.current?.showDialog("Error", "Something went wrong!");
        }
      }
    };

    verifyEmail();
  }, [url]);

  const handleResendEmail = async () => {
    setResendClickCount((clickCount) => clickCount + 1);
    const { error } = await signInWithEmail(email);
    if (error) {
      setErrorOccurred(true);
      errorDialogRef.current!.showDialog("Error", "Error sending the email!");
    }
  };

  const openEmailApp = () => {
    if (isAndroid) {
      const activityAction = "android.intent.action.MAIN";
      const intentParams: IntentLauncherParams = {
        category: "android.intent.category.APP_EMAIL",
      };
      startActivityAsync(activityAction, intentParams);
    } else if (isIos) {
      AppLinking.openURL("message://");
    }
  };

  return (
    <View style={styles.container}>
      <CustomDialog ref={errorDialogRef} />
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Text>Link to verify sent to your email.</Text>
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button onPress={handleResendEmail}>Resend Link</Button>
      </View>
      {(resendClickCount === 2 || errorOccurred) && (
        <Button onPress={() => navigation.replace("HomeStack")}>Skip</Button>
      )}
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button onPress={openEmailApp}>Open Mail App</Button>
      </View>
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

export default LinkConfirmation;
