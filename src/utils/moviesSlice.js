import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    topRatedMovies:null,
    upcomingMovies:null,
    trailerVideos: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTopRatedMoveis:(state,action)=>{
      state.topRatedMovies=action.payload;
    },
    addUpcomingMovies:(state,action)=>{
      state.upcomingMovies=action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideos = action.payload;
    },
  },
});
export const { addNowPlayingMovies, addTrailerVideo, addPopularMovies,addTopRatedMoveis,addUpcomingMovies } =
  moviesSlice.actions;
export default moviesSlice.reducer;
