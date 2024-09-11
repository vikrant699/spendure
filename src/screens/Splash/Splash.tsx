import { FC, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { supabase } from "../../common/libraries/supabase";
import { login, logout } from "../../store/slices/authSlice";
import { storeOnboardingType } from "../../store/thunks/authThunks";
import {
  NavigationType,
  OnboardingInfoType,
} from "../../common/typesAndInterfaces/types";
import { useAppDispatch } from "../../store/hooks";
import styles from "./Splash.styles";

const Splash: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigation: NavigationType = useNavigation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      const onboardingType =
        (await AsyncStorage.getItem("onboardingType")) ?? "";
      if (data.user) {
        dispatch(
          login({
            userId: data.user.id,
            loginType: data.user.app_metadata?.provider || "email",
          })
        );
        dispatch(storeOnboardingType(onboardingType as OnboardingInfoType));
        if (onboardingType !== "") navigation.replace("BottomTabs");
      } else {
        dispatch(logout());
        navigation.replace("AuthScreen");
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [dispatch, navigation, supabase]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return null;
};

export default Splash;
