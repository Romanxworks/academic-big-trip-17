import {getRandomInteger, generateRandomData} from '../utils.js';
import {TYPE} from './const.js';

const createOffer = () => ({
  type: generateRandomData(TYPE),
  offers: [
    {
      id: 1,
      title: 'Upgrade class',
      price: getRandomInteger(0,150)
    },
    {
      id: 1,
      title: 'Upgrade to a business class',
      price: getRandomInteger(0,150)
    },
    {
      id: 2,
      title: 'Choose the radio station',
      price: getRandomInteger(0,150)
    }
  ]
});
export{createOffer};
