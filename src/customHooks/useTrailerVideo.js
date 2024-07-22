import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useDispatch } from "react-redux";

const useTrailerVideo = (movieId) => {
  const dispatch = useDispatch();
  const video = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US", //hardcode for a single video
      API_OPTIONS
    );
    const json = await data.json();
    const filteredData = json.results.filter((t) => t.type === "Trailer");
    const trailer = filteredData.length ? filteredData[0] : json.results[0];
    dispatch(addTrailerVideo(trailer)); // we have two opetions here we can use useState for this well but it is better to use redux.
  };
  useEffect(() => {
    video();
  }, []);
};
export default useTrailerVideo;
