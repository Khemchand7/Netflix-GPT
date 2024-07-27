import { createSlice } from "@reduxjs/toolkit";

const GptSearchSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    gptMovies: null,
    tmdbMovies: null,
  },
  reducers: {
    toggleGptSearch: (state, action) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addTmdbGptmovieResult: (state, action) => {
      //ek hi action se do same data ko add kia hai
      const { tmdbMovies, gptMovies } = action.payload; //dispatch karte hue object send kia hai usko destructure kia hai aur respective me push kia hai
      state.gptMovies = gptMovies;
      state.tmdbMovies = tmdbMovies;
    },
  },
});
export const { toggleGptSearch, addTmdbGptmovieResult } =
  GptSearchSlice.actions;
export default GptSearchSlice.reducer;
