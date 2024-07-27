import React, { useRef } from "react";
import MovieCard from "./MovieCard";
import { useSelector } from "react-redux";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

const MovieList = ({ title, movies }) => {
  const currentIndex = useSelector((store) => store.index.index);
  const movieCarouselRef = useRef();

  const handleLeftScroll = () => {
    movieCarouselRef.current.scrollTo({
      left: movieCarouselRef.current.scrollLeft - 500,
      behavior: "smooth",
    });
  };

  const handleRightScroll = () => {
    movieCarouselRef.current.scrollTo({
      left: movieCarouselRef.current.scrollLeft + 500,
      behavior: "smooth",
    });
  };
  return (
    <div className="px-2 md:px-4 relative">
      <h1 className="text-sm md:text-2xl py-4 text-white font-semibold">
        {title}
      </h1>
      <div
        ref={movieCarouselRef}
        className="flex overflow-x-scroll scroll-smooth no-scrollbar movies"
      >
        <div
          className="text-shadow text-white absolute z-30 top-[55%] left-[2.5%] p-1 md:p-2 bg-[#161616b3] rounded-full cursor-pointer hover:scale-110 hover:bg-[#0c0c0cb3] transition-transform duration-300"
          onClick={handleLeftScroll}
        >
          <FaAngleLeft fontSize={25} />
        </div>
        <div className="flex gap-1 md:gap-4">
        {movies?.map((movie, idx) => {
          const isActive = idx === currentIndex;
          return (
            <MovieCard
              key={movie?.id}
              title={movie?.title}
              poster={movie?.poster_path}
              className={`w-20 md:w-40 h-28 md:h-52 flex-shrink-0 transition-transform duration-300 transform ${isActive & title==="Now Playing" ? 'scale-x-110 scale-y-[1.15] z-20' : 'scale-100 hover:scale-[1.02]'} `}
            />
          );
        })}
      </div>
        <div
          className="text-shadow text-white absolute z-30 top-[55%] right-[1.2%] p-1 md:p-2 bg-[#161616b3] rounded-full cursor-pointer hover:scale-110 hover:bg-[#0c0c0cb3] transition-transform duration-300"
          onClick={handleRightScroll}
        >
          <FaAngleRight fontSize={25} />
        </div>
      </div>
    </div>
  );
};

export default MovieList;