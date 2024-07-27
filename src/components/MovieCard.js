import React from 'react'
import { IMG_CDN_URL } from '../utils/constants';
const MovieCard = ({ title, poster, className }) => {
  if(!poster) return null;//poster nahi hai to hum movie ko nhi show kar rhe hai it can be handle in better way, we can show dummy poster or errro
  return (
    <div className={`p-1 md:p-2 rounded ${className}`}>
      <img src={IMG_CDN_URL+poster} alt={title} className="w-full h-full object-cover rounded" />
    </div>
  );
};

export default MovieCard;
