import {createPoint} from '../mock/point.js';
import {createOffer} from '../mock/offer.js';
import {createDestination} from '../mock/destination.js';

const QUANTITY_POINT = 15;
const QUANTITY_OFFER = 5;
const QUANTITY_DESTINATION
= 5;
class PointModel {
  point = Array.from({length: QUANTITY_POINT}, createPoint);

  getPoint = () => this.point;

  offers = Array.from({length: QUANTITY_OFFER}, createOffer);

  getOffer = () => this.offers;

  destination = Array.from({length: QUANTITY_DESTINATION}, createDestination);

  getDestination = () => this.destination;
}

export{PointModel};
