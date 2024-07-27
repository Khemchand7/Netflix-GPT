import React from "react";
import { useSelector } from "react-redux";
import Movielist from "./Movielist";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    <div className="bg-black bg-opacity-90">
      <div className="relative z-50 -mt-20  md:-mt-52">
        <Movielist title={"Now Playing"} movies={movies.nowPlayingMovies} />
        <Movielist title={"Trending Today On Netflix"} movies={movies.trendingTodayMovies} />
        <Movielist title={"Popular"} movies={movies.popularMovies} />
        <Movielist title={"Top Rated"} movies={movies.topRatedMovies} />
        <Movielist title={"Upcoming Movies"} movies={movies.upcomingMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
