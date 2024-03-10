import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  selectedAccountId: string | number;
}

const initialAppState: AppState = {
  selectedAccountId: 1,
};

export const appStateSlice = createSlice({
  name: "app_state",
  initialState: initialAppState,
  reducers: {
    updateSelectedAccountId(state, action: PayloadAction<string | number>) {
      state.selectedAccountId = action.payload;
    },
  },
});
