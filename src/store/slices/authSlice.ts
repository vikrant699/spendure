import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../../common/interfaces";

const initialState: AuthState = {
  loggedIn: false,
  userId: "",
};

// Auth Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string | null | undefined>) => {
      state.loggedIn = true;
      state.userId = action?.payload;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.userId = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
