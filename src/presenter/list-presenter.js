import ListView from '../view/list-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import ListSortView from '../view/list-sort-view.js';
import {remove,RenderPosition, render} from '../framework/render.js';
import {filter} from '../utils/filter.js';
import PointNewPresenter from './point-new-presenter.js';
import PointPresenter from './point-presenter.js';
import LoadingView from '../view/loading-view.js';
import {sortByPrice, sortByTime, sortByDay} from '../utils/sort.js';
import {SortType, UpdateType, UserAction, FilterType} from '../const.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class ListPresenter {
  #listComponent = new ListView();
  #listContainer = null;
  #pointModel = null;
  #listEmtyConponent = null;
  #pointPresenter = new Map();
  #pointNewPresenter = null;
  #currentSortType = SortType.DAY;
  #sortComponent = null;
  #filterModel = null;
  #filterType = FilterType.EVERYTHING;
  #loadingComponent = new LoadingView();
  #isLoading = true;
  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);

  constructor(listContainer, pointModel, filterModel){
    this.#listContainer = listContainer;
    this.#pointModel = pointModel;
    this.#filterModel = filterModel;
    this.#pointNewPresenter = new PointNewPresenter(this.#listComponent.element, this.#handleViewAction);
    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points(){
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointModel.points;
    const filteredPoints = filter[this.#filterType](points);
    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortByTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortByPrice);
      case SortType.DAY:
        return filteredPoints.sort(sortByDay);
    }

    return filteredPoints;
  }

  get offers(){
    return this.#pointModel.offers;
  }

  get destinations(){
    return this.#pointModel.destinations;
  }

  init = () => {
    this.#renderList();
  };

  createPoint = (callback) => {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#pointNewPresenter.init(callback, this.offers, this.destinations);
  };

  #renderList = () => {
    const points = this.points;
    const pointsCount = points.length;
    render(this.#listComponent, this.#listContainer);
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
    if(pointsCount === 0){
      this.#renderListEmty();
      return;
    }

    this.#renderListSort();

    this.#renderPoints();
  };

  #renderListSort = () =>{
    this.#sortComponent = new ListSortView(this.#currentSortType);
    render(this.#sortComponent , this.#listContainer,RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderListEmty = () =>{
    this.#listEmtyConponent =  new ListEmptyView(this.#filterType);
    render(this.#listEmtyConponent, this.#listContainer);
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#listContainer, RenderPosition.AFTERBEGIN);
  };

  #renderPoints = () => {
    this.points.forEach((point)=>this.#renderPoint(this.offers, this.destinations, point));
  };

  #renderPoint = (offers, destinations, point) => {
    const pointPresenter = new PointPresenter(this.#listComponent.element, this.#handleViewAction,  this.#handleModeChange);
    pointPresenter.init( offers, destinations, point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #clearList = ({resetSortType = false} = {}) => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if (this.#listEmtyConponent) {
      remove(this.#listEmtyConponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenter.get(update.id).setSaving();
        try {
          await this.#pointModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#pointNewPresenter.setSaving();
        try {
          await this.#pointModel.addPoint(updateType, update);
        } catch(err) {
          this.#pointNewPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenter.get(update.id).setDeleting();
        try {
          await this.#pointModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init( this.offers,this.destinations, data);
        break;
      case UpdateType.MINOR:
        this.#clearList();
        this.#renderList();
        break;
      case UpdateType.MAJOR:
        this.#clearList({resetSortType:true});
        this.#renderList();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderList();
        break;
    }
  };

  #handleModeChange = () => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearList();
    this.#renderList();
  };
}

