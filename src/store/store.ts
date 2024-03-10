import { configureStore } from "@reduxjs/toolkit";
import { accountsSlice } from "./accountsSlice";
import { appStateSlice } from "./appStateSlice";

const store = configureStore({
  reducer: {
    accounts: accountsSlice.reducer,
    appState: appStateSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const { reduceBalance, addBalance } = accountsSlice.actions;
export const { updateSelectedAccountId } = appStateSlice.actions;
export default store;
