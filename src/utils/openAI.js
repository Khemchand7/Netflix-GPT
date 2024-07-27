import OpenAI from 'openai';
import { OPENAI_KEY } from './constants';

const openai = new OpenAI({
  apiKey: OPENAI_KEY,//NEEDS TO BE CHANGE AFTER HIDING THE API KEY
  dangerouslyAllowBrowser: true,// needs to remove after wrapping my api key of open ai warna gand lag jaegi
});
export default openai;