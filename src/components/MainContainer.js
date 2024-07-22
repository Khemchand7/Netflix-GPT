import React from "react";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import { useSelector } from "react-redux";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (!movies) return null; //store ke hone se pehle hum yahan movies[0] fetch kar rhe hai is wajah se likha

  const mainMovie = movies[0];

  const { title, overview, id } = mainMovie;
  return (
    <div className="">
      <VideoBackground movieId={id} />
      <VideoTitle title={title} overview={overview} />
    </div>
  );
};

export default MainContainer;
