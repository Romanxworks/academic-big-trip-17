import {getRandomInteger, generateRandomData} from '../utils.js';
import {TYPE} from './const.js';
import {createDestination} from './destination.js';
import {createOffer} from './offer.js';

const offersGroup =  createOffer().offers;
// const funcrandom = (offer ,num)=>{if(offer.id === num){
//   return offer;
// } };
// const offerById = (offers, id)=>{
//   offers.map((offer) =>funcrandom(offer, id));
// };
const destination = createDestination();

const createPoint = () => ({
  basePrice: getRandomInteger(5,500),
  dateFrom:'2019-07-11T10:55:56.84',
  //    `2019-07-10T${getRandomInteger(1,2)}${getRandomInteger(0,3)}:${getRandomInteger(0,5)}${getRandomInteger(0,9)}:56.845Z`,
  dateTo: '2019-07-11T11:22:13.37',
  //   `2019-07-11T11:${getRandomInteger(0,5)}${getRandomInteger(0,9)}:13.375Z`,
  destination,
  id: 1,
  isFavorite: Boolean(getRandomInteger(0,1)),
  offers: offersGroup,
  type: generateRandomData(TYPE),
});

export{createPoint};

