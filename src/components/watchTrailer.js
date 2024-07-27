import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_OPTIONS } from "../utils/constants";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import Logo from "../assets/Logo.png";

const WatchTrailer = () => {
  const {movieId} = useParams();
  console.log(movieId);
  const [movieKey, setMovieKey] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovieTrailer();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchMovieTrailer = async () => {
    const movie = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId?.id +
        "/videos?language=en-US",
      API_OPTIONS
    );
    const json = await movie.json();
    const filterData = json.results.filter(
      (video) => video.type === "Trailer" || video.name === "Official Trailer"
    );
    setMovieKey(filterData[0]?.key);
  };

  return (
    <>
      <div className="fixed w-screen px-2 md:px-12 py-2 bg-black ">
        <Link to="/browse">
          <img src={Logo} alt="logo" className="w-24 md:w-32" />
        </Link>
      </div>
      {movieKey && (
        <div className="w-full h-screen text-center">
          <iframe
            width="100%"
            height="100%"
            src={
              `https://www.youtube.com/embed/` +
              movieKey +
              "?autoplay=1&controls=0&loop=1&playlist=" +
              movieKey
            }
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </>
  );
};

export default WatchTrailer;