import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";

interface AccountState {
  accountBalance: number;
}

const initialAccountStatus: AccountState = { accountBalance: 200 };

const accountsSlice = createSlice({
  name: "accounts",
  initialState: initialAccountStatus,
  reducers: {
    reduceBalance(state, action: PayloadAction<number>) {
      state.accountBalance -= action.payload;
    },
    addBalance(state, action: PayloadAction<number>) {
      state.accountBalance += action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    accounts: accountsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const { reduceBalance, addBalance } = accountsSlice.actions;
export default store;
