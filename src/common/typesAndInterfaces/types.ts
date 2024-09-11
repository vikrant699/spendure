import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/routers";
import { AccountState } from "./interfaces";

export type NavigationType = NativeStackNavigationProp<ParamListBase>;

export type RootStackParamList = {
  BottomTabs: undefined;
  Transactions: undefined;
  Settings: undefined;
  AddTransactionStack: undefined;
};

export type AuthStackParamList = {
  Authentication: undefined;
  LinkConfirmation: {
    email: string;
  };
  Home: undefined;
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

export type OnboardingInfoType = "skipped" | "completed" | "";
