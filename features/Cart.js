import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  itemCart: [],
  itemPurchased: [],
  coins: 100000,
  ticket: 3,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    buyItem: (state, action) => {
      state.itemPurchased.push(action.payload.itemPurchased);
      state.coins -= action.payload.coins;
    },
    getCoins: (state, action) => {
      state.coins += action.payload;
    },
    UseTicket: (state) => {
      state.ticket -= 1;
    },
  },
});

export const { buyItem, getCoins, UseTicket } = cartSlice.actions;

export default cartSlice.reducer;
