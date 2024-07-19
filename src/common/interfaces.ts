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
export interface AccountState {
  id: string;
  name: string;
  accountBalance: number;
  transactions: {
    title: string;
    notes: string;
    date: Date;
  }[];
}
