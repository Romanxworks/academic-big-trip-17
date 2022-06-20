import AbstractView from '../framework/view/abstract-view.js';
import dayjs from 'dayjs';
import {humanizePointDate, getTimeDifference} from '../utils/date-utils.js';


const createNewItemListTemplate = (point, allOffers=[]) => {
  const { basePrice = 1100,
    dateFrom = '2019-07-10T22:55:56.845Z',
    dateTo = '2019-07-11T11:22:13.375Z',
    destination = {name:'City'},
    isFavorite = true,
    type ='taxi',
    offers = []
  } = point;

  const offerElementTemplate = (offer) => { if(offers.includes(offer.id)){
    return (
      `<li class="event__offer">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
    </li>`
    );}};

  const favorite =  isFavorite ? 'event__favorite-btn--active' : '';
  const dateEvent = dayjs(dateFrom).format('D MMMM');
  const dateEventFrom = humanizePointDate(dateFrom);
  const dateEventTo = humanizePointDate(dateTo);
  const timeDifference = getTimeDifference(dateFrom,dateTo);
  const pointTypeOffer = () => allOffers.find((offer) => offer.type === type);
  const pointOffer = () => pointTypeOffer()?pointTypeOffer().offers.map(offerElementTemplate).join(''):'';
  const pointOfferTemplate = pointOffer();

  return( `<li class="trip-events__item"><div class="event">
    <time class="event__date" datetime="2019-03-18">${dateEvent}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${destination.name?destination.name:'City'}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="2019-03-18T10:30">${dateEventFrom}</time>
        &mdash;
        <time class="event__end-time" datetime="2019-03-18T11:00">${dateEventTo}</time>
      </p>
      <p class="event__duration">${timeDifference}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      
    ${pointOfferTemplate}
    </ul>
    <button class="event__favorite-btn ${favorite}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
    </div></li>`);
};


export default class ItemListView extends AbstractView{
  #point = null;
  #offer = null;

  constructor(point, offer){
    super();
    this.#offer = offer;
    this.#point = point;
  }

  get template() {
    return createNewItemListTemplate(this.#point, this.#offer);
  }

  setEditClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };
}

