import { createSlice } from "@reduxjs/toolkit";

// Slice
const rootSlice = createSlice({
  name: "ccbudgetapp",

  initialState: {
    user: null,
    cartState: [],
    credentials:{},
  },

  reducers: {
    logIn: (state, action) => {
      state.user = action.payload;
    },
    logOut: (state) => {
      state.user = null;
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
export const { logIn, logOut, cartReducer, userCredentialse } = rootSlice.actions;
export const reducer = rootSlice.reducer;
