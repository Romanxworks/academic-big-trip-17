import {render, replace, remove, RenderPosition} from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';
import {sortByDay} from '../utils/sort.js';

export default class TripInfoPresenter {
  #tripInfoContainer = null;
  #pointModel = null;
  #tripInfoComponent = null;

  constructor(tripInfoContainer, pointModel) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#pointModel = pointModel;

    this.#pointModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    return this.#pointModel.points.sort(sortByDay);
  }

  get offers() {
    return this.#pointModel.offers;
  }

  init = () => {
    const points = this.points;
    const offers = this.offers;
    const prevTripInfoComponent = this.#tripInfoComponent;

    this.#tripInfoComponent = new TripInfoView(points, offers);

    if (prevTripInfoComponent === null) {
      render(this.#tripInfoComponent, this.#tripInfoContainer, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);
  };

  #handleModelEvent = () => {
    this.init();
  };

}
