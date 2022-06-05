import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  itemCart: [],
  itemPurchased: [],
  coins: 100000,
  ticket: 3,
};

export const fetchPurchased = createAsyncThunk("cart/fetchPurchased", () => {
  const item = JSON.parse(localStorage.getItem("purchased"));
  return item ? item : [];
});

export const fetchCoins = createAsyncThunk("cart/fetchCoins", () => {
  const item = localStorage.getItem("coins");
  return item ? item : 100000;
});

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
    GetTicket: (state) => {
      state.ticket += 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPurchased.fulfilled, (state, action) => {
      state.itemPurchased = action.payload;
    });
    // builder.addCase(fetchCoins.pending, (state) => {
    //   state.coins = 0;
    // });
    builder.addCase(fetchCoins.fulfilled, (state, action) => {
      state.coins = action.payload;
    });
  },
});

export const { buyItem, getCoins, UseTicket } = cartSlice.actions;

export default cartSlice.reducer;
