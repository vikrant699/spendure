import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AuthState,
  LoginPayload,
} from "../../common/typesAndInterfaces/interfaces";

const initialState: AuthState = {
  loggedIn: false,
  userId: "",
  loginType: "",
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
});

export const { login, logout } = authSlice.actions;
