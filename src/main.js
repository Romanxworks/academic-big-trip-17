import {NewListFilter} from './view/list-filter-view.js';
import {NewListSort} from './view/list-sort-view.js';
import {ListPresenter} from './presenter/list-presenter.js';
import {NewTripInfo} from './view/trip-info-view.js';
import {render} from './render.js';

const headerElement = document.querySelector('.page-header');
const filtersElement = headerElement.querySelector('.trip-controls__filters');
const pageMainElement = document.querySelector('.page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');
const tripMain = document.querySelector('.trip-main');
const listPresenter = new ListPresenter();

render(new NewTripInfo(),tripMain, 'afterbegin');
render(new NewListFilter(),filtersElement);
render(new NewListSort(),tripEventsElement);

listPresenter.init(tripEventsElement);
