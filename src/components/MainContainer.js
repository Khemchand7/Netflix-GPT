import React from "react";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import { useSelector } from "react-redux";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (!movies) return null; //store ke hone se pehle hum yahan movies[0] fetch kar rhe hai is wajah se likha

  const mainMovie = movies[0];

  const { title, overview, id } = mainMovie;
//   return (
//     <div>
//       <div className="relative">
//         <VideoBackground movieId={id} />
//         <VideoTitle title={title} overview={overview} />
//       </div>
//     </div>
//   );
// };
return (
  <div className="relative min-h-screen">
    <VideoBackground movieId={id} className="absolute inset-0" />
    <VideoTitle title={title} overview={overview} className="absolute inset-0" />
  </div>
);
};

export default MainContainer;
