import { createSlice } from "@reduxjs/toolkit";

// Slice
const rootSlice = createSlice({
  name: "ccbudgetapp",

  initialState: {
    user: null,
    pagetile: "",
    ccbudget_data: [],
    orientation: "",
    MonthlyIncome: [],
    addMonthBill: false,
  },

  reducers: {
    logIn: (state, action) => {
      state.user = action.payload;
    },
    logOut: (state) => {
      state.user = null;
    },
    pageTitle: (state, action) => {
      state.pagetile = action.payload;
    },
    ccBudgetData: (state, action) => {
      state.ccbudget_data = action.payload;
    },
    currentOrientation: (state, action) => {
      state.orientation = action.payload;
    },
    MonthlyIncomeMethod: (state, action) => {
      state.MonthlyIncome = action.payload;
    },
    AddMonthBill: (state, action) => {
      state.addMonthBill = action.payload;
    },
  },
});

// Actions
export const {
  logIn,
  logOut,
  pageTitle,
  ccBudgetData,
  currentOrientation,
  MonthlyIncomeMethod,
  AddMonthBill,
} = rootSlice.actions;
export const reducer = rootSlice.reducer;
