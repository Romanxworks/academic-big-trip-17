import {getRandomInteger, generateRandomData} from '../utils.js';
import {TYPE} from './const.js';
import {createDestination} from './destination.js';
import {createOffer} from './offer.js';

const offersGroup =  createOffer().offers;


const destination = createDestination();

const createPoint = () => ({
  basePrice: getRandomInteger(5,500),
  dateFrom:'2019-07-10T09:22:20.84',
  dateTo: '2019-07-11T11:22:13.37',
  destination,
  id: getRandomInteger(1,2),
  isFavorite: Boolean(getRandomInteger(0,1)),
  offers: offersGroup,
  type: generateRandomData(TYPE),
});

export{createPoint};

