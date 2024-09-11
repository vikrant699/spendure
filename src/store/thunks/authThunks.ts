import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { OnboardingInfoType } from "../../common/typesAndInterfaces/types";

export const storeOnboardingType = createAsyncThunk(
  "auth/storeOnboardingType",
  async (onboardingType: OnboardingInfoType) => {
    await AsyncStorage.setItem(
      "onboardingType",
      JSON.stringify(onboardingType)
    );
    return onboardingType;
  }
);
