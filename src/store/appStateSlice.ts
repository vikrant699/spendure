import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  selectedAccountId: number;
  transferAccountId: number;
}

const initialAppState: AppState = {
  selectedAccountId: 0,
  transferAccountId: 0,
};

export const appStateSlice = createSlice({
  name: "app_state",
  initialState: initialAppState,
  reducers: {
    updateSelectedAccountId(state, action: PayloadAction<number>) {
      state.selectedAccountId = action.payload;
    },
    updateTransferAccountId(state, action: PayloadAction<number>) {
      state.transferAccountId = action.payload;
    },
  },
});
