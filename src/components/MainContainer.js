import React, { useState, useEffect } from "react";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import { useSelector } from "react-redux";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!movies || movies.length === 0) return;

    // Calculate the delay for each movie
    const delay = (2 * 60 * 1000); // 2 minutes / number of movies

    // Set the initial movie
    setCurrentMovie(movies[index]);

    // Create the interval to update the index
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, delay);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [movies]);

  useEffect(() => {
    if (movies && movies.length > 0) {
      setCurrentMovie(movies[index]);
    }
  }, [index, movies]);

  if (!currentMovie) return setCurrentMovie(movies[0]);

  const { title, overview, id } = currentMovie;

  return (
    <div className="relative min-h-screen">
      <VideoBackground movieId={id} className="absolute inset-0" />
      <VideoTitle title={title} overview={overview} className="absolute inset-0" />
    </div>
  );
};

export default MainContainer;
