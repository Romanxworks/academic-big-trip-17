import {getRandomInteger, generateRandomData} from '../utils/random-data-utils.js';
import {generateDate} from '../utils/date-utils.js';
import {TYPE} from './const.js';
import {createDestination} from './destination.js';

const createPoint = () => ({
  basePrice: getRandomInteger(5,500),
  dateFrom:generateDate('hour'),
  dateTo: generateDate('minutes'),
  destination:createDestination(),
  isFavorite: Boolean(getRandomInteger(0,1)),
  offers: [getRandomInteger(1,3),getRandomInteger(4,6)],
  type: generateRandomData(TYPE),
});

export{createPoint};

