import ListFilter from './view/list-filter-view.js';
import ListPresenter from './presenter/list-presenter.js';
import TripInfo from './view/trip-info-view.js';
import {render} from './framework/render.js';
import PointModel from './model/point-model.js';
import {generateFilter} from  './mock/filter.js';

const headerElement = document.querySelector('.page-header');
const filtersElement = headerElement.querySelector('.trip-controls__filters');
const pageMainElement = document.querySelector('.page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');
const tripMain = document.querySelector('.trip-main');
const pointModel = new PointModel();
const listPresenter = new ListPresenter(tripEventsElement, pointModel);
const filters = generateFilter(pointModel.point);

render(new TripInfo(),tripMain, 'afterbegin');
render(new ListFilter(filters),filtersElement);

listPresenter.init();
