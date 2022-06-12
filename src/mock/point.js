import {getRandomInteger, generateRandomData} from '../utils/random-data-utils.js';
import {generateDate} from '../utils/date-utils.js';
import {TYPES} from '../const.js';
import {nanoid} from 'nanoid';
import {createDestinations} from './destination.js';

const createPoint = () => ({
  basePrice: getRandomInteger(5,500),
  dateFrom: generateDate('hour'),
  dateTo: generateDate('minutes'),
  destination: createDestinations()[getRandomInteger(0,6)],
  id: nanoid(),
  isFavorite: Boolean(getRandomInteger(0,1)),
  offers: [getRandomInteger(1,3),getRandomInteger(4,6)],
  type: generateRandomData(TYPES),
});

export{createPoint};

