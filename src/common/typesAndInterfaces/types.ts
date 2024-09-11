import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/routers";
import { AccountState } from "./interfaces";

export type NavigationType = NativeStackNavigationProp<ParamListBase>;

export type RootStackParamList = {
  SplashScreen: undefined;
  AuthScreen: { redirectTo?: string; fromBottomTabs?: boolean };
  LinkConfirmationScreen: {
    email: string;
    redirectTo?: string;
    fromBottomTabs?: boolean;
  };
  BottomTabs: undefined;
  SettingsScreen: { fromBottomTabs?: boolean };
  AddTransactionStack: undefined;
  AddAccountScreen: undefined;
};

export type AddTransactionStackParamList = {
  AddTransaction: undefined;
  TransactionCategory: undefined;
  SelectItem: {
    title?: string;
    screenNumber: number;
    itemIcon?: string;
    items: AccountState[];
    onSelect: (payload: Record<string, any>) => void;
  };
};

export type BottomTabsParamList = {
  HomeScreen: undefined;
  Dummy: undefined;
  SettingsScreen: { fromBottomTabs?: boolean };
};

export type OnboardingInfoType = "skipped" | "completed" | "";
