import React, { useRef } from "react";
import lang from "../utils/languageConstants/gptSearchPage";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openAI";
import { API_OPTIONS } from "../utils/constants";
import { addTmdbGptmovieResult } from "../utils/GptSearchSlice";

const GPTSearchBar = () => {
  const dispatch=useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  //lang is the name of array and lang[langKey] is lang[eng],lang[hindi],lang[marathi] and so on....
  const searchBoxText = useRef();

  //it is an async function and it will return promise
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  const handleGptSearchClick = async () => {
    console.log(searchBoxText.current.value);
    //yahan pr ab gpt api call karenge aur search box ki value ka gpt se results lenge
    //gpt is dumb jab tak usko achhe se samjhaenge nhi tab tak shi se results nhi dega.
    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchBoxText.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });
    if (!gptResults.choices) {
      // TODO: Write Error Handling
    }
    console.log(gptResults.choices?.[0]?.message?.content);
    // Andaz Apna Apna, Hera Pheri, Chupke Chupke, Jaane Bhi Do Yaaro, Padosan
    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
    // ["Andaz Apna Apna", "Hera Pheri", "Chupke Chupke", "Jaane Bhi Do Yaaro", "Padosan"]
    console.log(gptMovies);

    // ab hum yahan pr har ek movie lie tmdb api to get the data
    const promiseArray=gptMovies.map((movie)=>searchMovieTMDB(movie));
    // [Promise, Promise, Promise, Promise, Promise]
    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);

    dispatch(addTmdbGptmovieResult({gptMovies:gptMovies,tmdbMovies:tmdbResults}));
  };
  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-1 grid-rows-2 text-white justify-items-center mt-20 ">
        <h1 className="text-shadow text-[48px] font-[900]">
          {lang[langKey].gptHeader1}
        </h1>
        <div>
          <form
            className="grid grid-cols-12 gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              ref={searchBoxText}
              type="text"
              placeholder={lang[langKey].gptPlaceHolder}
              className="col-span-9 w-full m-4 p-3  bg-[#161616b3] border-[#808080b3] border-[0.1rem] rounded"
            />
            <button
              type="submit"
              className="text-shadow col-span-3 w-full m-4 p-3 bg-[rgb(229,9,20)] hover:bg-red-600  text-3xl font-[600] rounded"
              onClick={handleGptSearchClick}
            >
              {lang[langKey].gptButton}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GPTSearchBar;
