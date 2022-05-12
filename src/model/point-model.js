import {createPoint} from '../mock/point.js';
import {createOffer} from '../mock/offer.js';

const LENGTH= 15;

export default class PointModel {
  #points = Array.from({length: LENGTH}, createPoint);
  #offers = Array.from({length: LENGTH}, createOffer);

  get point() {return this.#points;}
  get offer() {return this.#offers;}

}

