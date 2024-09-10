import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const storeOnboardingType = createAsyncThunk(
  "auth/storeOnboardingType",
  async (onboardingType: "skipped" | "completed") => {
    await AsyncStorage.setItem(
      "onboardingType",
      JSON.stringify(onboardingType)
    );
    return onboardingType;
  }
);
