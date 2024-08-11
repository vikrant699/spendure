import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { makeRedirectUri } from "expo-auth-session";
import * as AppleAuthentication from "expo-apple-authentication";
import { supabase } from "../../common/supabase";
import { NavigationType } from "../../common/types";
import { updateAuthDetails } from "../slices/authSlice";
import { useAppDispatch } from "../hooks";

const validateEmail = (email: string): boolean => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

interface SignInWithEmailParams {
  email: string;
  navigation: NavigationType;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery(),
  endpoints: (build) => ({
    signInWithEmail: build.mutation<null, SignInWithEmailParams>({
      queryFn: async ({
        email,
        navigation,
      }: {
        email: string;
        navigation: NavigationType;
      }) => {
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
          navigation.navigate("LinkConfirmation");
          return { data: null };
        } catch (error: any) {
          return { error: { status: 500, data: error.message } };
        }
      },
    }),

    signOut: build.mutation<null, NavigationType>({
      queryFn: async (navigation: NavigationType) => {
        try {
          const { error } = await supabase.auth.signOut();
          if (error) throw error;
          // if (navigation.canGoBack()) {
          //   navigation.goBack();
          // } else {
          //   navigation.replace("Home");
          // }
          return { data: null };
        } catch (error: any) {
          return { error: { status: 500, data: error.message } };
        }
      },
    }),

    createSessionFromUrl: build.mutation<any, string>({
      queryFn: async (url: string) => {
        const dispatch = useAppDispatch();
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
          dispatch(updateAuthDetails(data.session?.user.id));
          return { data: null };
        } catch (error: any) {
          return { error: { status: 500, data: error.message } };
        }
      },
    }),

    appleSignIn: build.mutation<any, NavigationType>({
      queryFn: async (navigation: NavigationType) => {
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

            if (error) throw error;
            navigation.replace("Home");
            return { data: user };
          } else {
            throw new Error("No identityToken.");
          }
        } catch (error: any) {
          if (error.code === "ERR_REQUEST_CANCELED") {
            // handle that the user canceled the sign-in flow
            return { data: null };
          } else {
            return { error: { status: 500, data: error.message } };
          }
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
} = authApi;
