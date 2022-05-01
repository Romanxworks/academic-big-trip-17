import {ListFilter} from './view/list-filter-view.js';
import {ListSort} from './view/list-sort-view.js';
import {ListPresenter} from './presenter/list-presenter.js';
import {TripInfo} from './view/trip-info-view.js';
import {render} from './render.js';

const headerElement = document.querySelector('.page-header');
const filtersElement = headerElement.querySelector('.trip-controls__filters');
const pageMainElement = document.querySelector('.page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');
const tripMain = document.querySelector('.trip-main');
const listPresenter = new ListPresenter();

render(new TripInfo(),tripMain, 'afterbegin');
render(new ListFilter(),filtersElement);
render(new ListSort(),tripEventsElement);

listPresenter.init(tripEventsElement);
