import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { makeRedirectUri } from "expo-auth-session";
import * as AppleAuthentication from "expo-apple-authentication";
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
  async (
    { email, navigation }: { email: string; navigation: NavigationType },
    { rejectWithValue }
  ) => {
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
      navigation.navigate("LinkConfirmation");
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
        navigation.replace("Home");
      }
      if (error) throw error;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createSessionFromUrl = createAsyncThunk(
  "auth/createSessionFromUrl",
  async (url: string, { rejectWithValue }) => {
    try {
      const parsedUrl = new URL(url);
      const params = new URLSearchParams(parsedUrl.hash.substring(1));
      const access_token = params.get("access_token") as string;
      const refresh_token = params.get("refresh_token") as string;

      if (!access_token || !refresh_token) {
        throw new Error("Missing access_token or refresh_token");
      }

      const { data, error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      });
      if (error) throw error;
      return data.session;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const appleSignIn = createAsyncThunk(
  "auth/appleSignIn",
  async (navigation: NavigationType, { rejectWithValue }) => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      if (credential.identityToken) {
        const {
          error,
          data: { user },
        } = await supabase.auth.signInWithIdToken({
          provider: "apple",
          token: credential.identityToken,
        });
        console.log(JSON.stringify({ error, user }, null, 2));
        if (!error) {
          navigation.replace("Home");
          return user;
        }
      } else {
        throw new Error("No identityToken.");
      }
    } catch (error: any) {
      if (error.code === "ERR_REQUEST_CANCELED") {
        // handle that the user canceled the sign-in flow
      } else {
        return rejectWithValue(error.message);
      }
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
        state.loggedIn = true;
      })
      .addCase(appleSignIn.fulfilled, (state, action) => {
        state.userId = action.payload?.id;
        state.loggedIn = true;
      });
  },
});
