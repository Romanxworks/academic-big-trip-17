import List from '../view/list-view.js';
import ListEmpty from '../view/list-empty-view.js';
import ListSort from '../view/list-sort-view.js';
import {render} from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import {updateItem} from '../utils/common.js';
import {sortByPrice, sortByTime, sortByDay} from '../utils/sort.js';
import {SortType} from '../mock/const.js';
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
  #currentSortType = SortType.DAY;
  #sourcedPointsList = [];

  constructor(listContainer, pointModel){
    this.#listContainer = listContainer;
    this.#pointModel = pointModel;
  }

  init = () => {
    this.#pointsList = [...this.#pointModel.points];
    this.#offers = [...this.#pointModel.offers];
    this.#destinations = [...this.#pointModel.destinations];
    this.#sourcedPointsList = [...this.#pointModel.points];
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

  #renderListSort = () =>{
    render(this.#listSort , this.#listContainer);
    this.#listSort.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

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

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.TIME:
        this.#pointsList.sort(sortByTime);
        break;
      case SortType.PRICE:
        this.#pointsList.sort(sortByPrice);
        break;
      default:
        this.#pointsList.sort(sortByDay);
    }

    this.#currentSortType = sortType;
  };

  #handlePointChange = (updatedPoint) => {
    this.#pointsList = updateItem(this.#pointsList, updatedPoint);
    this.#sourcedPointsList = updateItem(this.#sourcedPointsList, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint, this.#offers,this.#destinations);
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    // - Сортируем задачи
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    // - Очищаем список
    this.#clearPointList();
    // - Рендерим список заново
    this.#renderPoints();
  };
}

