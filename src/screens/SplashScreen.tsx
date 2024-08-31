// src/components/SplashScreen.tsx
import { FC, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { supabase } from "../common/supabase";
import { login, logout } from "../store/slices/authSlice"; // Adjust path as needed
import { NavigationType } from "../common/types";

const SplashScreen: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigation: NavigationType = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        console.log(data)
        dispatch(login(data.session.user.id));
        navigation.navigate("HomeStack");
      } else {
        dispatch(logout());
        navigation.navigate("AuthStack");
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
