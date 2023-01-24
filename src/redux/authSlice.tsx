import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface AuthState {
  authState: boolean;
  a_tkn: string;
}

// Initial state
const initialState: AuthState = {
  authState: false,
  a_tkn: "",
};

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set the authentication status
    setAuthState(state, action) {
      state.authState = action.payload;
    },
    setATkn(state, action) {
      state.a_tkn = action.payload;
    },
    // extraReducers: {
    //   [HYDRATE]: (state, action) => {
    //     return {
    //       ...state,
    //       ...action.payload.auth,
    //     };
    //   },
    // },
  },
});

export const { setAuthState, setATkn } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth;
export default authSlice.reducer;
