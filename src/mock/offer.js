import {getRandomInteger, generateRandomData} from '../utils.js';
import {TYPE} from './const.js';

const createOffer = () => ({
  type: generateRandomData(TYPE),
  offers: [
    {
      id: getRandomInteger(1,3),
      title: 'Upgrade class',
      price: getRandomInteger(0,150)
    },
    {
      id: getRandomInteger(1,3),
      title: 'Choose the radio station',
      price: getRandomInteger(0,50)
    },
    {
      id: getRandomInteger(1,3),
      title: 'Check seats',
      price: getRandomInteger(0,100)
    }
  ]
});
export{createOffer};
