import ListPresenter from './presenter/list-presenter.js';
import TripInfo from './view/trip-info-view.js';
import {render} from './framework/render.js';
import PointModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filters-presenter.js';
import NewPointButtonView from './view/new-point-button-view.js';
import PointApiService from './api-sevices/point-api-service.js';
import DestinationApiService from './api-sevices/destinations-api-service.js';
import OffersApiService from './api-sevices/offers-api-service.js';

const AUTHORIZATION = 'Basic zhHM9Rz3X4Knf1';
const END_POINT = 'https://17.ecmascript.pages.academy/big-trip';

const headerElement = document.querySelector('.page-header');
const filtersElement = headerElement.querySelector('.trip-controls__filters');
const pageMainElement = document.querySelector('.page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');
const tripMain = document.querySelector('.trip-main');
const newPointButtonComponent = new NewPointButtonView();
const pointsApiService = new PointApiService(END_POINT, AUTHORIZATION);
const destinationApiService = new DestinationApiService(END_POINT, AUTHORIZATION);
const offersApiService = new OffersApiService(END_POINT, AUTHORIZATION);
const pointModel = new PointModel(pointsApiService, destinationApiService, offersApiService);
const filterModel = new FilterModel();
const listPresenter = new ListPresenter(tripEventsElement, pointModel, filterModel);
const filterPresenter = new FilterPresenter(filtersElement, filterModel, pointModel);


render(new TripInfo(),tripMain, 'afterbegin');
const handleNewPointFormClose = () => {
  newPointButtonComponent.element.disabled = false;
};

const handleNewPointButtonClick = () => {
  listPresenter.createPoint(handleNewPointFormClose);
  newPointButtonComponent.element.disabled = true;
};

listPresenter.init();
filterPresenter.init();
pointModel.init().finally(() => {
  render(newPointButtonComponent, tripMain);
  newPointButtonComponent.setClickHandler(handleNewPointButtonClick);
});
