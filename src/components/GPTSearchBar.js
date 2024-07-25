import React from "react";
import lang from "../utils/languageConstants/gptSearchPage";
import { useSelector } from "react-redux";

const GPTSearchBar = () => {
    const langKey=useSelector(store=>store.config.lang);
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="grid grid-cols-1 grid-rows-3 text-white justify-items-center  ">
        <h1 className="text-shadow text-[48px] font-[900]">
          {lang[langKey].gptHeader1}
        </h1>
        <h2 className=" text-shadow text-[24px] font-[500]">{lang[langKey].gptHeader2}</h2>
        <div>
          <form className="grid grid-cols-12 gap-2">
            <input
              type="text"
              placeholder={lang[langKey].gptPlaceHolder}
              className="col-span-9 w-full m-4 p-3  bg-[#161616b3] border-[#808080b3] border-[0.1rem] rounded"
            />
            <button
              type="submit"
              className="text-shadow col-span-3 w-full m-4 p-3 bg-[rgb(229,9,20)] hover:bg-red-600  text-3xl font-[600] rounded"
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
