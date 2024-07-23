import React from "react";
import { useSelector } from "react-redux";
import Movielist from "./Movielist";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    <div>
      <Movielist title={"Now Playing"} movies={movies.nowPlayingMovies} />
      <Movielist title={"Popular"} movies={movies.popularMovies} />
      <Movielist title={"Top Rated"} movies={movies.topRatedMovies} />
      <Movielist title={"Upcoming Movies"} movies={movies.upcomingMovies} />
    </div>
  );
};

export default SecondaryContainer;
