import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface Currency {
  currencyOptions: string[];
}

type Action = {
  payload: any;
  type: string;
};

const initialState: Currency = {
  currencyOptions: [],
};

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrencyOptions: (state, action: Action) => {
      state.currencyOptions = action.payload;
    },
  },
});

export const { setCurrencyOptions } = currencySlice.actions;

export const selectCurrency = (state: RootState) => state.currency;

export default currencySlice.reducer;
