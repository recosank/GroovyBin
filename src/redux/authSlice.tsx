import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface AuthState {
  chgBg: boolean;
}

// Initial state
const initialState: AuthState = {
  chgBg: false,
};

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set the authentication status
    changeBackground(state) {
      if (window.scrollY >= 66) {
        state.chgBg = true;
      } else {
        state.chgBg = false;
      }
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

export const { changeBackground } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth;
export default authSlice.reducer;
