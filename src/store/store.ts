import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";

interface AccountState {
  accountBalance: number;
}

const initialAccountStatus: AccountState = { accountBalance: 123 };

const accountSlice = createSlice({
  name: "auth",
  initialState: initialAccountStatus,
  reducers: {
    reduceBalance(state, action: PayloadAction<number>) {
      state.accountBalance -= action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    accounts: accountSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const { reduceBalance } = accountSlice.actions;
export default store;
