import {getRandomInteger, generateRandomData} from '../utils/random-data-utils.js';
import {CITIES,DESCRIPTIONS} from '../const.js';

const createPictures = () => ({
  src: `http://picsum.photos/300/200?r=${getRandomInteger(1,15)}`,
  description: generateRandomData(DESCRIPTIONS)
});

const createDestination = (city) => ({
  description: generateRandomData(DESCRIPTIONS),
  name: city,
  pictures: Array.from({length: getRandomInteger(2,6)}, createPictures)
});
const createDestinations = () => CITIES.map((city) => createDestination(city));

export{createDestinations};
