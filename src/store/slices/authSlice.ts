import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import { supabase } from "../../common/supabase";
import { AuthState } from "../../common/interfaces";
import { NavigationType } from "../../common/types";

const validateEmail = (email: string): boolean => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

const initialState: AuthState = {
  loggedIn: false,
  userId: "",
};

// Async Thunks
export const signInWithEmail = createAsyncThunk(
  "auth/signInWithEmail",
  async (email: string, { rejectWithValue }) => {
    if (!validateEmail(email)) {
      Alert.alert("Invalid email format");
      return rejectWithValue("Invalid email format");
    }

    const redirectTo = makeRedirectUri();
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectTo,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const signOut = createAsyncThunk(
  "auth/signOut",
  async (navigation: NavigationType, { rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.signOut();
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigation.navigate("Home");
      }
      if (error) throw error;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createSessionFromUrl = createAsyncThunk(
  "auth/createSessionFromUrl",
  async (
    { url, navigation }: { url: string; navigation: NavigationType },
    { rejectWithValue }
  ) => {
    try {
      const { params, errorCode } = QueryParams.getQueryParams(url);

      if (errorCode) throw new Error(errorCode);

      const { access_token, refresh_token } = params;
      if (!access_token) return;

      const { data, error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      });

      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigation.navigate("Home");
      }
      if (error) throw error;

      return data.session;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Auth Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signOut.fulfilled, (state) => {
        state.userId = null;
        state.loggedIn = false;
      })
      .addCase(createSessionFromUrl.fulfilled, (state, action) => {
        state.userId = action.payload?.user.id;
        state.loggedIn = false;
      });
  },
});
