import { AccountState } from "./interfaces";

export type RootStackParamList = {
  BottomTabs: undefined;
  Transactions: undefined;
  Settings: undefined;
  AddTransactionStack: undefined;
};

export type AddTransactionStackParamList = {
  AddTransaction: undefined;
  TransactionCategory: undefined;
  SelectItem: {
    title?: string;
    items: AccountState[];
    onSelect: (payload: Record<string, any>) => void;
  };
};
