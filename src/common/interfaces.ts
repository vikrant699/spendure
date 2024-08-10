import { NavigationType } from "./types";

// For components with only navigation prop
export interface NavigationOnlyProps {
  navigation: NavigationType;
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

// State in authSlice
export interface AuthState {
  loggedIn: boolean;
  userId: string | null | undefined;
}
