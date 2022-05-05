import {createPoint} from '../mock/point.js';
import {createOffer} from '../mock/offer.js';
import {createDestination} from '../mock/destination.js';

const quantityPoint = 15;
const quantityOffer = 5;
const quantityDestination = 5;

class PointModel {
  point = Array.from({length: quantityPoint}, createPoint);

  getPoint = () => this.point;

  offers = Array.from({length: quantityOffer}, createOffer);

  getOffer = () => this.offers;

  destination = Array.from({length: quantityDestination}, createDestination);

  getDestination = () => this.destination;
}

export{PointModel};
