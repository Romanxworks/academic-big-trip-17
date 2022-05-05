import {getRandomInteger, generateRandomData} from '../utils.js';
import {CITIES,DESCRIPTIONS} from './const.js';

const createDestination = () => ({
  description: generateRandomData(DESCRIPTIONS),
  name: generateRandomData(CITIES),
  pictures: [
    {
      src: `http://picsum.photos/300/200?r=${getRandomInteger(0,15)}`,
      description: generateRandomData(DESCRIPTIONS)
    },
    {
      src: `http://picsum.photos/300/200?r=${getRandomInteger(0,15)}`,
      description: generateRandomData(DESCRIPTIONS)
    }
  ]
});

export{createDestination};
