import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { makeRedirectUri, AuthSessionResult } from "expo-auth-session";
import {
  signInAsync,
  AppleAuthenticationScope,
} from "expo-apple-authentication";

import { supabase } from "../../../common/libraries/supabase";
import { GoogleSignin } from "../../../common/libraries/googleSignInNative";
import { validateEmail } from "./authApis.helpers";
import { isAndroid } from "../../../common/constants/constants";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery(),
  endpoints: (build) => ({
    signInWithEmail: build.mutation<null, string>({
      queryFn: async (email: string) => {
        if (!validateEmail(email)) {
          return { error: { status: 400, data: "Invalid email format" } };
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
          return { data: null };
        } catch (error: any) {
          return { error: { status: 500, data: error.message } };
        }
      },
    }),

    signOut: build.mutation<null, void>({
      queryFn: async () => {
        try {
          const { error } = await supabase.auth.signOut();
          if (error) throw error;

          if (isAndroid) {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
          }

          return { data: null };
        } catch (error: any) {
          return { error: { status: 500, data: error.message } };
        }
      },
    }),

    createSessionFromUrl: build.mutation<any, string>({
      queryFn: async (url: string) => {
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
          return { data: data };
        } catch (error: any) {
          return { error: { status: 500, data: error.message } };
        }
      },
    }),

    appleSignIn: build.mutation<any, void>({
      queryFn: async () => {
        try {
          const credential = await signInAsync({
            requestedScopes: [
              AppleAuthenticationScope.FULL_NAME,
              AppleAuthenticationScope.EMAIL,
            ],
          });

          if (credential.identityToken) {
            const { error, data } = await supabase.auth.signInWithIdToken({
              provider: "apple",
              token: credential.identityToken,
            });

            if (error) throw error;
            return { data: data };
          } else {
            throw new Error("No identityToken.");
          }
        } catch (error: any) {
          return {
            error: { status: 500, code: error.code, data: error.message },
          };
        }
      },
    }),

    googleSignInOAuth: build.mutation<any, AuthSessionResult | null>({
      queryFn: async (response) => {
        if (response?.type === "success") {
          try {
            const { data, error } = await supabase.auth.signInWithIdToken({
              provider: "google",
              token: response?.params.id_token,
              access_token: response?.params.access_token,
            });

            if (error) throw error;
            return { data: data };
          } catch (error: any) {
            return {
              error: { status: 500, code: error.code, data: error.message },
            };
          }
        }
        return {
          error: {
            status: 400,
            code: "UNKNOWN",
            data: "Google sign-in failed",
          },
        };
      },
    }),

    googleSignInNative: build.mutation<any, void>({
      queryFn: async () => {
        try {
          GoogleSignin.configure({
            webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
            forceCodeForRefreshToken: true,
          });
          await GoogleSignin.signOut();
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          const { data, error } = await supabase.auth.signInWithIdToken({
            provider: "google",
            token: userInfo.idToken,
          });

          if (error) throw error;
          return { data: data };
        } catch (error: any) {
          return {
            error: { status: 500, code: error.code, data: error.message },
          };
        }
      },
    }),
  }),
});

export const {
  useSignInWithEmailMutation,
  useSignOutMutation,
  useCreateSessionFromUrlMutation,
  useAppleSignInMutation,
  useGoogleSignInOAuthMutation,
  useGoogleSignInNativeMutation,
} = authApi;
