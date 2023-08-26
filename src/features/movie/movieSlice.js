import { createSlice } from "@reduxjs/toolkit";
import userSlice from "../user/userSlice";

const initialState = {
  recommend: null,
  newDisney: null,
  original: null,
  trending: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.recommend = action.playload.recommend;
      state.newDisney = action.playload.newDisney;
      state.original = action.playload.original;
      state.trending = action.playload.trending;
    },
  },
});

export const { setMovie } = movieSlice.actions;

export const selectRecommend = (state) => state.recommend;
export const selectNewDisney = (state) => state.newDisney;
export const selectOriginal = (state) => state.original;
export const selectTrending = (state) => state.trending;

export default userSlice.reducers;
