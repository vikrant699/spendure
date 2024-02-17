import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  auth: boolean;
}

const initialAuthState: AuthState = { auth: false };

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    authenticate(state, action: PayloadAction<boolean>) {
      state.auth = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export const { authenticate } = authSlice.actions;
export default store;