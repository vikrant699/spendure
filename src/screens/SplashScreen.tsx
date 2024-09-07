// src/components/SplashScreen.tsx
import { FC, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { supabase } from "../common/libraries/supabase";
import { login, logout } from "../store/slices/authSlice"; // Adjust path as needed
import { NavigationType } from "../common/typesAndInterfaces/types";

const SplashScreen: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigation: NavigationType = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        dispatch(
          login({
            userId: data.user.id,
            loginType: data.user.app_metadata.provider || "email",
          })
        );
        navigation.replace("HomeStack");
      } else {
        dispatch(logout());
        navigation.replace("AuthStack");
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

  return null; // Render nothing while transitioning
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SplashScreen;
