import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";

const initialState = {
  articles_offset: 0,
};

export const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setArticlesOffset(state, action) {
      state.articles_offset = action.payload;
    },
  },
});

export const selectArticles = (state: RootState) => state.articles;

export const { setArticlesOffset } = articlesSlice.actions;
export default articlesSlice.reducer;
