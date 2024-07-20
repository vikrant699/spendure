import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/routers";

// For components with only navigation prop
export interface NavigationOnlyProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}

// State in appStateSlice
export interface AppState {
  selectedAccountId: string;
  transferAccountId: string;
}

// State in accountsSlice

export interface Transaction {
  id: string;
  date: Date;
  amount: number;
  category: string;
  operation: string;
  toAccount?: string;
  fromAccount?: string;
}
export interface AccountState {
  id: string;
  name: string;
  accountBalance: number;
  transactions: Transaction[];
}
