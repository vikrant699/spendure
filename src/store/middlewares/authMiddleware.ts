import { Middleware } from "@reduxjs/toolkit";
import * as Linking from "expo-linking";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../hooks";
import { createSessionFromUrl } from "../slices/authSlice";
import { NavigationType } from "../../common/types";

export const authMiddleware: Middleware = () => (next) => async (action) => {
  const dispatch = useAppDispatch();
  const navigation: NavigationType = useNavigation();
  const url = Linking.useURL();
  if (url) {
    dispatch(createSessionFromUrl({ url, navigation }));
  }
  return next(action);
};
