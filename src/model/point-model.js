import {createPoint} from '../mock/point.js';
import {createOffer} from '../mock/offer.js';
import {createDestinations} from '../mock/destination.js';

const LENGTH= 15;

export default class PointModel {
  #points = Array.from({length: LENGTH}, createPoint);
  #offers = Array.from({length: LENGTH}, createOffer);
  #destinations = createDestinations();

  get points() {return this.#points;}
  get offers() {return this.#offers;}
  get destinations() {return this.#destinations;}

}

