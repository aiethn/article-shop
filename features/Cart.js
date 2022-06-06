import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  itemCart: [],
  itemPurchased: [],
  coins: 100000,
  ticket: 1,
};

export const fetchPurchased = createAsyncThunk("cart/fetchPurchased", () => {
  const item = JSON.parse(localStorage.getItem("purchased"));
  return item ? item : [];
});

export const fetchCart = createAsyncThunk("cart/fetchCart", () => {
  const item = JSON.parse(localStorage.getItem("cart"));
  return item ? item : [];
});

export const fetchCoins = createAsyncThunk("cart/fetchCoins", () => {
  const item = localStorage.getItem("coins");
  return item ? item : 100000;
});

export const fetchTicket = createAsyncThunk("cart/fetchTicket", () => {
  const item = localStorage.getItem("tickets");
  return item ? item : 1;
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    buyItem: (state, action) => {
      state.itemPurchased.push(action.payload.itemPurchased);
      state.coins -= action.payload.coins;
    },
    addToCart: (state, action) => {
      state.itemCart.push(action.payload);
    },
    deleteFromCartById: (state, action) => {
      const newValue = state.itemCart.filter(
        (cart) => cart.id != action.payload
      );
      state.itemCart = newValue;
    },
    getCoins: (state, action) => {
      state.coins += action.payload;
    },
    UseTicket: (state) => {
      state.ticket -= 1;
    },
    getTicket: (state, action) => {
      state.ticket += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPurchased.fulfilled, (state, action) => {
      state.itemPurchased = action.payload;
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.itemCart = action.payload;
    });
    builder.addCase(fetchCoins.fulfilled, (state, action) => {
      state.coins = action.payload;
    });
    builder.addCase(fetchTicket.fulfilled, (state, action) => {
      state.ticket = action.payload;
    });
  },
});

export const {
  buyItem,
  addToCart,
  getCoins,
  UseTicket,
  deleteFromCartById,
  getTicket,
} = cartSlice.actions;

export default cartSlice.reducer;
