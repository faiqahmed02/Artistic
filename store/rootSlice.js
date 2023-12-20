import { createSlice } from "@reduxjs/toolkit";

// Slice
const rootSlice = createSlice({
  name: "ccbudgetapp",

  initialState: {
    user: null,
    cartState: [],
    credentials: {},
    signupState: [],
  },

  reducers: {
    logIn: (state, action) => {
      state.user = action.payload;
    },
    logOut: (state) => {
      state.user = null;
    },
    signUpReducer: (state, action) => {
      state.signupState = action.payload;
    },
    userCredentialse: (state, action) => {
      state.credentials = action.payload;
    },
    cartReducer: (state, action) => {
      state.cartState = action.payload;
    },
  },
});

// Actions
export const { logIn, logOut, cartReducer, userCredentialse, signUpReducer } =
  rootSlice.actions;
export const reducer = rootSlice.reducer;
