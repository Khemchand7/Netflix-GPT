import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice";

const useNowPlayingMovies=()=>{
    const dispatch=useDispatch();

  //API CALL FOR NOW PLAYING MOVIES
  const getNowPlyaingMovies = async ()=>{
    const data= await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS)
    const json=await data.json();
    console.log(json);
    //pushing fetched data into redux store
    dispatch(addNowPlayingMovies(json.results));
  }
  useEffect(()=>{getNowPlyaingMovies()},[]);
};
export default useNowPlayingMovies;