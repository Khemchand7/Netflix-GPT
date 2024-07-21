import React, { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";

const VideoBackground = ({ moiveId }) => {
  const dispatch=useDispatch();
  const trailerVideo=useSelector((store)=>store.movies?.trailerVideos);

  const video = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/1022789/videos?language=en-US",//hardcode for a single video 
      API_OPTIONS
    );
    const json = await data.json();
    const filteredData = json.results.filter((t) => t.type === "Trailer");
    const trailer = filteredData.length ? filteredData[0] : json.results[0];
    dispatch(addTrailerVideo(trailer));// we have two opetions here we can use useState for this well but it is better to use redux.
  };
  useEffect(() => {
    video();
  }, []);

  return (
    <div>
      <iframe
        width={560}
        height={315}
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo?.key +
          "?&autoplay=1&mute=1"
        }
        title="YouTube video player"
        frameBorder={0}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen=""
      />
    </div>
  );
};

export default VideoBackground;
