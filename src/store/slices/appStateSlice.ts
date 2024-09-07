import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../../common/typesAndInterfaces/interfaces";

const initialAppState: AppState = {
  selectedAccountId: "",
  transferAccountId: "",
};

export const appStateSlice = createSlice({
  name: "app_state",
  initialState: initialAppState,
  reducers: {
    updateSelectedAccountId(state, action: PayloadAction<string>) {
      state.selectedAccountId = action.payload;
    },
    updateTransferAccountId(state, action: PayloadAction<string>) {
      state.transferAccountId = action.payload;
    },
  },
});
