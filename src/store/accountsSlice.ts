import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";

interface AccountState {
  [accountId: number]: {
    accountId: number;
    accountName: string;
    accountBalance: number;
    transactions: {
      title: string;
      notes: string;
      date: Date;
    }[];
  };
}

const initialAccountStatus: AccountState = {
  1: {
    accountId: 1,
    accountName: "Account 1",
    accountBalance: 0,
    transactions: [],
  },
  2: {
    accountId: 2,
    accountName: "Account 2",
    accountBalance: 0,
    transactions: [],
  },
};

export const accountsSlice = createSlice({
  name: "accounts",
  initialState: initialAccountStatus,
  reducers: {
    reduceBalance(
      state,
      action: PayloadAction<{ accountId: number; amount: number }>
    ) {
      const { accountId, amount } = action.payload;
      if (state[accountId]) {
        state[accountId].accountBalance -= amount;
      }
    },
    addBalance(
      state,
      action: PayloadAction<{ accountId: number; amount: number }>
    ) {
      const { accountId, amount } = action.payload;
      if (state[accountId]) {
        state[accountId].accountBalance += amount;
      }
    },
    addAccount(
      state,
      action: PayloadAction<{ accountName: string; balance: number }>
    ) {
      const { accountName, balance } = action.payload;
      const maxAccountId = Math.max(...Object.keys(state).map(Number));
      state[maxAccountId + 1] = {
        accountId: maxAccountId + 1,
        accountName: accountName,
        accountBalance: balance,
        transactions: [],
      };
    },
  },
});
