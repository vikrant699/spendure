import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const storeOnboardingComplete = createAsyncThunk(
  "auth/storeOnboardingComplete",
  async (onboardingComplete: boolean) => {
    await AsyncStorage.setItem(
      "onboardingComplete",
      JSON.stringify(onboardingComplete)
    );
  }
);
