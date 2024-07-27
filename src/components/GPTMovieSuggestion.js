import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./Movielist";

const GPTMovieSuggestion = () => {
  const gpt = useSelector((store) => store.gpt);
  const { gptMovies, tmdbMovies } = gpt;
  if (!gptMovies) return null;
  console.log(gpt);
  return (
    <div className="bg-[#161616b3] opacity-95 my-8 p-4">
    <div>
      <h1 className="text-shadow text-white font-extrabold text-2xl mx-[32%]">Here are some recommended movies!!</h1>
    </div>
      <div className="opacity-100">
      {gptMovies.map((movieName, index) => (
        <MovieList
          key={movieName}
          title={movieName}
          movies={tmdbMovies[index]}
        />
      ))}
      </div>
    </div>
  );
};

export default GPTMovieSuggestion;
