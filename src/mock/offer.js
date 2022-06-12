import {getRandomInteger, generateRandomData} from '../utils/random-data-utils.js';
import {TYPES} from '../const.js';

const createOffer = () => ({
  type: generateRandomData(TYPES),
  offers: [
    {
      id: 1,
      title: 'Upgrade class',
      price: getRandomInteger(1,150)
    },
    {
      id: 3,
      title: 'Choose the radio station',
      price: getRandomInteger(1,50)
    },
    {
      id: 5,
      title: 'Check seats',
      price: getRandomInteger(1,100)
    }
  ]
});
export{createOffer};
