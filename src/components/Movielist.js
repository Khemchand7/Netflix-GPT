import React from "react";
import MovieCard from "./MovieCard";
import { useSelector } from "react-redux";

const MovieList = ({ title, movies }) => {
  const currentIndex = useSelector((store) => store.index.index);
  return (
    <div className="ml-12">
      <h2 className="text-shadow text-2xl font-bold mt-4 mb-2 text-white">{title}</h2>
      <div className="flex flex-nowrap gap-1 overflow-x-scroll">
        {movies?.map((movie, idx) => {
          const isActive = idx === currentIndex;
          return (
            <MovieCard
              key={movie?.id}
              title={movie?.title}
              poster={movie?.poster_path}
              className={`w-40 h-52 flex-shrink-0 transition-transform duration-300 transform ${isActive ? 'scale-x-110 scale-y-[1.15] z-20' : 'scale-100 hover:scale-[1.02]'} `}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MovieList;
