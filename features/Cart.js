import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  itemCart: [],
  itemPurchased: [],
  coins: 100000,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    buyItem: (state, action) => {
      state.itemPurchased.push(action.payload.itemPurchased);
      state.coins -= action.payload.coins;
    },
  },
});

export const { buyItem } = cartSlice.actions;

export default cartSlice.reducer;
