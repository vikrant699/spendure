import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  AuthState,
  LoginPayload,
} from "../../common/typesAndInterfaces/interfaces";
import { storeOnboardingType } from "../thunks/authThunks";

const initialState: AuthState = {
  loggedIn: false,
  userId: "",
  loginType: "",
  onboardingType: "",
};

// Auth Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.loggedIn = true;
      state.userId = action.payload.userId;
      state.loginType = action.payload.loginType;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.userId = "";
      state.loginType = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(storeOnboardingType.fulfilled, (state, action) => {
      state.onboardingType = action.payload;
    });
  },
});

export const { login, logout } = authSlice.actions;
