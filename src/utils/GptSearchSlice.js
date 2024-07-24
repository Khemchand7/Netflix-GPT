import { createSlice } from "@reduxjs/toolkit";

const GptSearchSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
  },
  reducers: {
    toggleGptSearch: (state, action) => {
      state.showGptSearch = !state.showGptSearch;
    },
  },
});
export const { toggleGptSearch } = GptSearchSlice.actions;
export default GptSearchSlice.reducer;
