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
    addToCart: (state, action) => {
      state.itemCart.push(action.payload.itemCart);
      state.coins -= action.payload.coins;
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
