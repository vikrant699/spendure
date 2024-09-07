import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AccountState,
  Transaction,
} from "../../common/typesAndInterfaces/interfaces";

const initialAccountStatus: AccountState[] = [
  {
    id: "1",
    name: "Account 1",
    accountBalance: 0,
    transactions: [],
  },
  {
    id: "2",
    name: "Account 2",
    accountBalance: 0,
    transactions: [],
  },
];

export const accountsSlice = createSlice({
  name: "accounts",
  initialState: initialAccountStatus,
  reducers: {
    reduceBalance(
      state,
      action: PayloadAction<{
        id: string;
        amount: number;
        transaction: Transaction;
      }>
    ) {
      const { id, amount, transaction } = action.payload;
      const accountToUpdate = state.find((acc) => acc.id === id);
      if (accountToUpdate) {
        accountToUpdate.accountBalance -= amount;
        accountToUpdate.transactions.push(transaction);
      }
    },
    addBalance(state, action: PayloadAction<{ id: string; amount: number }>) {
      const { id, amount } = action.payload;
      const accountToUpdate = state.find((acc) => acc.id === id);
      if (accountToUpdate) {
        accountToUpdate.accountBalance += amount;
      }
    },
    addAccount(
      state,
      action: PayloadAction<{ name: string; balance: number }>
    ) {
      const { name, balance } = action.payload;
      const maxAccountId = Math.max(...state.map((acc) => Number(acc.id)));
      state.push({
        id: (+maxAccountId + 1).toString(),
        name: name,
        accountBalance: balance,
        transactions: [],
      });
    },
  },
});
