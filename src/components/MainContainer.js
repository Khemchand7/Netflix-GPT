import React, { useEffect } from "react";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import { useSelector, useDispatch } from "react-redux";
import { incrementIndex, setIndex } from "../utils/indexSlice";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const index = useSelector((store) => store.index.index);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!movies || movies.length === 0) return;

    // Calculate the delay for each movie
    const totalCycleTime = 2.4 * 17 * 60 * 1000;
    const delay = totalCycleTime / movies.length;

    // Set the initial movie index
    dispatch(setIndex(1));

    // Create the interval to update the index
    const intervalId = setInterval(() => {
      dispatch(incrementIndex(movies.length));
    }, delay);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [movies, dispatch]);

  if (!movies || movies.length === 0) return null;

  const currentMovie = movies[index];
  const { title, overview, id } = currentMovie;

  return (
    <div className="relative min-h-screen">
      <VideoBackground movieId={id} className="absolute inset-0" />
      <VideoTitle
        title={title}
        overview={overview}
        className="absolute inset-0"
      />
    </div>
  );
};

export default MainContainer;

/* Explanation of above code

Single Source of Truth:

currentMovie: This state holds the currently displayed movie and ensures that both the video and title are in sync by updating together.
Effect Hooks:

The first useEffect sets the initial movie and starts an interval that updates the index every (2 * 60 * 1000) / movies.length milliseconds.
The second useEffect runs whenever the index changes, ensuring the currentMovie is updated to the corresponding movie in the movies array.
Ensuring Sync:

By updating currentMovie within the second useEffect, we ensure both the VideoBackground and VideoTitle components receive the updated movie data at the same time.
If you encounter any issues with the components not updating correctly, ensure the VideoBackground and VideoTitle components properly handle the change in their props.
 */
/* 
updated EXPLANATION-
Explanation:
No currentMovie State:

We removed the useState hooks for currentMovie and setCurrentMovie.
Current Movie Derivation:

The current movie is derived directly from the movies array using the index from the Redux store: const currentMovie = movies[index];.
Effect for Interval Management:

The useEffect hook calculates the delay for each movie and sets an interval to dispatch the incrementIndex action periodically.
The setIndex action initializes the index to 0 when the movies array changes.
The interval ID is cleared when the component unmounts to avoid memory leaks.
Component Rendering:

The VideoBackground and VideoTitle components are rendered based on the currentMovie derived from the index and movies array.
This ensures that the component correctly updates the current movie based on the index managed by Redux. The currentMovie is always derived from the movies array using the index from the Redux store, which simplifies the component's state management. */
