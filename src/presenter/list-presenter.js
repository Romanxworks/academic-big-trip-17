import List from '../view/list-view.js';
import ListEmpty from '../view/list-empty-view.js';
import ListSort from '../view/list-sort-view.js';
import {render} from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import {updateItem} from '../utils/common.js';
export default class ListPresenter {
  #listComponent = new List();
  #listContainer = null;
  #pointModel = null;
  #pointsList = [];
  #offers = [];
  #destinations = [];
  #listEmpty = new ListEmpty();
  #listSort = new ListSort();
  #pointPresenter = new Map();

  constructor(listContainer, pointModel){
    this.#listContainer = listContainer;
    this.#pointModel = pointModel;
  }

  init = () => {
    this.#pointsList = [...this.#pointModel.points];
    this.#offers = [...this.#pointModel.offers];
    this.#destinations = [...this.#pointModel.destinations];
    this.#renderList();
  };

  #renderList = () => {
    if(this.#pointsList.length === 0){
      this.#renderListEmty();
    }else{
      this.#renderListSort();
      this.#renderlistComponent();
      this.#renderPoints();
    }
  };

  #renderlistComponent = () => render(this.#listComponent, this.#listContainer);

  #renderListSort = () => render(this.#listSort , this.#listContainer);

  #renderListEmty = () => render(this.#listEmpty, this.#listContainer);

  #renderPoints = () => {
    this.#pointsList.slice().forEach((point)=>this.#renderPoint(point, this.#offers, this.#destinations));
  };

  #renderPoint = (point, offers, destinations) => {
    const pointPresenter = new PointPresenter(this.#listComponent.element, this.#handlePointChange,  this.#handleModeChange);
    pointPresenter.init(point, offers, destinations);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #handlePointChange = (updatedPoint) => {
    this.#pointsList = updateItem(this.#pointsList, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint, this.#offers,this.#destinations);
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };
}

