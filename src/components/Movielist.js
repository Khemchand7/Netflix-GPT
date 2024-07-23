import React from "react";
import MovieCard from "./MovieCard";

const Movielist = ({ title, movies }) => {
  return (
    <div className="ml-12">
      <h2 className="text-2xl font-bold mt-4 mb-2">{title}</h2>
      <div className="flex flex-nowrap gap-1 overflow-x-scroll">
        {movies?.map((movie) => (
          <MovieCard
            key={movie?.id}
            title={"Now Playing"}
            poster={movie?.poster_path}
            className="w-40 h-52 flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
};

export default Movielist;
