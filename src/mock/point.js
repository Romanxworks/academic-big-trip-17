import {getRandomInteger, generateRandomData, generateDate} from '../utils.js';
import {TYPE} from './const.js';
import {createDestination} from './destination.js';

const createPoint = () => ({
  basePrice: getRandomInteger(5,500),
  dateFrom:generateDate('hour'),
  //`2019-07-1${getRandomInteger(0,1)}T0${getRandomInteger(1,9)}:2${getRandomInteger(0,9)}:20.84`,
  dateTo: generateDate('minutes'),
  //`2019-07-11T1${getRandomInteger(1,9)}:3${getRandomInteger(0,9)}:13.37`,
  destination:createDestination(),
  isFavorite: Boolean(getRandomInteger(0,1)),
  offers: [getRandomInteger(1,3),getRandomInteger(4,6)],
  type: generateRandomData(TYPE),
});

export{createPoint};

