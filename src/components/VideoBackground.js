import React from "react";
import { useSelector } from "react-redux";
import useTrailerVideo from "../customHooks/useTrailerVideo";


const VideoBackground = ({ movieId }) => {

  const trailerVideo = useSelector((store) => store.movies?.trailerVideos);
  useTrailerVideo(movieId);

  return (
    <div className="relative w-screen overflow-hidden" >
    
      <iframe className="w-screen aspect-video"
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo?.key +
          "?rel=0&autoplay=1&mute=1&loop=1&playlist="+trailerVideo?.key
        }
        title="YouTube video player"
        FrameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
};

export default VideoBackground;
