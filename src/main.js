import ListPresenter from './presenter/list-presenter.js';
import TripInfo from './view/trip-info-view.js';
import {render} from './framework/render.js';
import PointModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filters-presenter.js';
import NewPointButtonView from './view/new-point-button-view.js';

const headerElement = document.querySelector('.page-header');
const filtersElement = headerElement.querySelector('.trip-controls__filters');
const pageMainElement = document.querySelector('.page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');
const tripMain = document.querySelector('.trip-main');
const newPointButtonComponent = new NewPointButtonView();
const pointModel = new PointModel();
const filterModel = new FilterModel();
const listPresenter = new ListPresenter(tripEventsElement, pointModel, filterModel);
const filterPresenter = new FilterPresenter(filtersElement, filterModel, pointModel);


render(new TripInfo(),tripMain, 'afterbegin');
const handleNewPointFormClose = () => {
  newPointButtonComponent.element.disabled = false;
};

const handleNewPointButtonClick = () => {
  listPresenter.createTask(handleNewPointFormClose);
  newPointButtonComponent.element.disabled = true;
};

render(newPointButtonComponent, tripMain);
newPointButtonComponent.setClickHandler(handleNewPointButtonClick);


listPresenter.init();
filterPresenter.init();
