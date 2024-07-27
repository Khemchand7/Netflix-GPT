import React from 'react'
import GPTSearchBar from './GPTSearchBar';
import GPTMovieSuggestion from './GPTMovieSuggestion';
import { NETFLIX_BGD_IMG } from '../utils/constants';

const GptSearch = () => {
  return (
    <div>
    <img alt='bgd-image' src={NETFLIX_BGD_IMG} className='fixed w-full h-full object-cover -z-20'></img>
      <GPTSearchBar/>
      <GPTMovieSuggestion/>
    </div>
  )
}

export default GptSearch;