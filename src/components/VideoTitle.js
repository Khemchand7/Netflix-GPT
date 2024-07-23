import React from "react";
import { BiSolidRightArrow } from "react-icons/bi";
import { LuInfo } from "react-icons/lu";

const VideoTitle = ({ title, overview }) => {
  return (
    <div
      id="text-shadow"
      className="text-shadow w-[600px] h-[348.609px] text-white absolute inset-0 mt-60 ml-12"
    >
    {/* w-[600px] h-[348.609px] mt-60 ml-14 absolute */}
      <h1
        id="myButton"
        className="text-6xl font-bold transform origin-bottom-left"
      >
        {title}
      </h1>
      <p className="font-[500] text-lg mb-3 ">{overview}</p>
      <div className="flex items-center text-xl font-[500]">
        <button className="bg-white rounded-[4px] py-[0.35rem] px-[1rem] mr-[0.7rem] text-black hover:bg-opacity-70">
          <BiSolidRightArrow className="inline w-7 h-7 mb-1" /> Play
        </button>
        <button className="bg-[#6d6d6eb3] rounded-[4px] py-[0.35rem] px-[1rem] mr-[0.7rem] text-white hover:bg-[#545456b3]">
          <LuInfo className="inline w-7 h-7 mx-2 mb-1" />
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
