import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
  category: "",
  day: "",
};

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    addArticle: (state, action) => {
      state.value = action.payload.item;
      state.category = action.payload.category;
      state.day = action.payload.day;
    },
  },
});

export const { addArticle } = articleSlice.actions;

export default articleSlice.reducer;
