import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTrendingTodayMovies } from "../utils/moviesSlice";

const useTrendingToday = () => {
  const dispatch = useDispatch();
  const trendingTodayMovies = useSelector(
    (store) => store.movies.trendingTodayMovies
  );

  const getTrendingTodayMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addTrendingTodayMovies(json.results));
  };
  useEffect(() => {
    !trendingTodayMovies && getTrendingTodayMovies();
  }, []);
};
export default useTrendingToday;
