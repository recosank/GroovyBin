import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface AuthState {
  LikedTracks: any;
}

// Initial state
const initialState: AuthState = {
  LikedTracks: [],
};

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fetchLikedTracks(state, payload) {
      state.LikedTracks = payload.payload;
    },
    addLikedTrack(state, payload) {
      state.LikedTracks = [...state.LikedTracks, payload.payload];
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

export const { fetchLikedTracks, addLikedTrack } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth;
export default authSlice.reducer;
