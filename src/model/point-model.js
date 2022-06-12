import Observable from '../framework/observable.js';
import {createPoint} from '../mock/point.js';
import {createOffer} from '../mock/offer.js';
import {createDestinations} from '../mock/destination.js';

const LENGTH= 15;

export default class PointModel extends Observable{
  #points = Array.from({length: LENGTH}, createPoint);
  #offers = Array.from({length: LENGTH}, createOffer);
  #destinations = createDestinations();

  get points() {return this.#points;}
  get offers() {return this.#offers;}
  get destinations() {return this.#destinations;}

  updatePoint = (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  };

  addPoint = (updateType, update) => {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  };

  deletePoint = (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  };

}

