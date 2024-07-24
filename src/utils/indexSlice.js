import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  index: 0,
};

const indexSlice = createSlice({
  name: 'index',
  initialState,
  reducers: {
    incrementIndex: (state, action) => {
      state.index = (state.index + 1) % action.payload; // action.payload should be the length of the movies array
    },
    setIndex: (state, action) => {
      state.index = action.payload;
    },
  },
});

export const { incrementIndex, setIndex } = indexSlice.actions;

export default indexSlice.reducer;
