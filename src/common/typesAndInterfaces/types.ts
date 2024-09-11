import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/routers";
import { AccountState } from "./interfaces";

export type NavigationType = NativeStackNavigationProp<ParamListBase>;

export type HomeStackParamList = {
  BottomTabs: undefined;
  Transactions: undefined;
  Settings: { name: string };
  AddTransactionStack: undefined;
  AddAccountScreen: undefined;
};

export type AuthStackParamList = {
  AuthScreen: { redirectTo?: string };
  LinkConfirmationScreen: { email: string; redirectTo?: string };
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
  Home: undefined;
  Dummy: undefined;
  Settings: { name: string };
};

export type OnboardingInfoType = "skipped" | "completed" | "";
