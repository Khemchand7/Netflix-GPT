/* import React from 'react'
import { IMG_CDN_URL } from '../utils/constants';

const MovieCard = ({poster}) => {
  // console.log(poster);
  return (
    <div className="">
      <img alt='poster' src={IMG_CDN_URL+poster} ></img>
    </div>
  )
}

export default MovieCard;

 */
import React from 'react'
import { IMG_CDN_URL } from '../utils/constants';
const MovieCard = ({ title, poster, className }) => {
  return (
    <div className={` p-2 rounded ${className}`}>
      <img src={IMG_CDN_URL+poster} alt={title} className="w-full h-full object-cover rounded" />
    </div>
  );
};

export default MovieCard;