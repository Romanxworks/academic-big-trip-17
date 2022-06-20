import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {pointDateAddEdit} from '../utils/date-utils.js';
import flatpickr from 'flatpickr';
import dayjs from 'dayjs';
import he from 'he';


import 'flatpickr/dist/flatpickr.min.css';

const BLANK_POINT = {
  basePrice: 100,
  dateFrom: dayjs().toString(),
  dateTo: dayjs().add(1, 'hour').toString(),
  destination: {
    description: '',
    name: '',
    pictures: [
      {
        src: '',
        description: ''
      }
    ]
  },
  type: 'taxi',
  isFavorite: false,
  offers: []
};

const typeListTemplate = (type) => (`<div class="event__type-item">
<input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
<label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type[0].toUpperCase()+type.slice(1)}</label>
</div>`);

const createTypeList = (offers) => offers.map((offer) => typeListTemplate(offer.type)).join('');

const destinationListTemplate = (destinationName) => (`<option value="${destinationName}"></option>`);
const createDestinationList = (destinations) => destinations.map((destination) => destinationListTemplate(destination.name)).join('');

const offersItemTemplate = (offer, isDisabled) => (`<div class="event__offer-selector">
<input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}" type="checkbox" name="event-offer-${offer.id}" ${isDisabled? 'disabled' : ''}>
<label class="event__offer-label" for="event-offer-${offer.id}">
  <span class="event__offer-title">${offer.title}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${offer.price}</span>
</label>
</div>`);
const createOfferItems = (offers, isDisabled) => offers.map((offer) => offersItemTemplate(offer, isDisabled)).join('');
const getOffersByPointType = (offers, type) => offers.find((offer) =>offer.type === type);

const destinationPicturesTemplate = (picture) => (`<img class="event__photo" src="${picture.src}" alt="Event photo">`);
const createDestinationPictures = (pictures) => pictures.map((picture) => destinationPicturesTemplate(picture)).join('');
const getDestinationByName = (destinations, name) => {
  if(name){
    return destinations.find((destination) => destination.name === name);
  }
  return null;
};
const destinationContainerTemplate = (stateDestination) => {
  if(stateDestination !== null && stateDestination.name !== ''){
    return (`<section class="event__section  event__section--destination">
                <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                <p class="event__destination-description">${stateDestination.description}</p>
  
                <div class="event__photos-container">
                 <div class="event__photos-tape">
                   ${createDestinationPictures(stateDestination.pictures)}
                 </div>
                </div>
              </section>`
    );
  }
  return '';
};

const createAddNewPointTemplate = ( offers = [], destinations = [], point) => {
  const {
    statePrice,
    stateDateFrom,
    stateDateTo,
    stateDestination,
    stateType,
    isDisabled,
    isSaving,
  } = point;

  const pointDateFrom = pointDateAddEdit(stateDateFrom);
  const pointDateTo = pointDateAddEdit(stateDateTo);
  const typeList = createTypeList(offers);
  const destinationList = createDestinationList(destinations);
  const stateOffers = getOffersByPointType(offers, stateType);
  const offerItems = createOfferItems(stateOffers.offers, isDisabled);
  const destinationSectoin = destinationContainerTemplate(stateDestination);

  return (`<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${stateType}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox"
        ${isDisabled? 'disabled' : ''}>
        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${typeList}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
        ${stateType}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${stateDestination !== null? he.encode(stateDestination.name): ''}" list="destination-list-1" ${isDisabled? 'disabled' : ''} required>
        <datalist id="destination-list-1">
        ${destinationList}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${pointDateFrom}" ${isDisabled? 'disabled' : ''}>
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${pointDateTo}" ${isDisabled? 'disabled' : ''}>
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price"
         value="${statePrice}" ${isDisabled? 'disabled' : ''}>
      </div>
      <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled? 'disabled' : ''}>
      ${isSaving ? 'Saving...' : 'Save'}</button>
      <button class="event__reset-btn" type="reset" ${isDisabled? 'disabled' : ''}>Cancel</button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers ${offerItems ===''? 'visually-hidden':''}">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
           ${offerItems}
        </div>
      </section>

      ${destinationSectoin}
      
    </section>
  </form>
</li>`
  );};


export default class AddNewPointView extends AbstractStatefulView{
  #destinations = null;
  #offer = null;
  #datepicker = null;

  constructor(offers, destinations){
    super();
    this.#offer = offers;
    this.#destinations = destinations;
    this._state = AddNewPointView.parsePointToState(BLANK_POINT);
    this.#setInnerHandlers();
    this.#setDatepickerFrom();
    this.#setDatepickerTo();
  }

  get template() {
    return createAddNewPointTemplate(this.#offer, this.#destinations, this._state);
  }

  reset = (point) => {
    this.updateElement(
      AddNewPointView.parsePointToState(point),
    );
  };

  removeElement = () => {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDatepickerFrom();
    this.#setDatepickerTo();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
  };


  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  #setDatepickerFrom = () => {
    this.#datepicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        maxDate:this._state.stateDateTo,
        defaultDate: this._state.stateDateFrom,
        onChange: this.#setDateFromHandler,
      },
    );
  };

  #setDatepickerTo = () => {
    this.#datepicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        minDate:this._state.stateDateFrom,
        defaultDate: this._state.stateDateTo,
        onChange: this.#setDateToHandler,
      },
    );
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(AddNewPointView.parseStateToPoint(this._state));
  };

  #typeToggleHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      stateType: evt.target.value
    });
  };

  #destinationToggleHandler = (evt) => {
    evt.preventDefault();
    this._state.stateDestination = getDestinationByName(this.#destinations, evt.target.value);
    if(!this._state.stateDestination){
      this._state.stateDestination = BLANK_POINT.destination;
    }
    this.updateElement({stateDestination:this._state.stateDestination});
  };

  #setDateFromHandler = ([userDateFrom]) => {
    const dateFrom = userDateFrom.toISOString();
    this.updateElement({
      stateDateFrom: dateFrom,
    });
  };

  #priceToggleHandler = (evt) => {
    evt.preventDefault();
    this._setState({statePrice:Number(evt.target.value)});
  };

  #setDateToHandler = ([userDateTo]) => {
    const dateTo = userDateTo.toISOString();
    this.updateElement({
      stateDateTo: dateTo
    });
  };

  #offersToggleHandler = (evt) => {
    evt.preventDefault();
    const offersChecked = this.element.querySelectorAll('.event__offer-checkbox:checked');
    const offerPoint = [];
    offersChecked.forEach((offer) => offerPoint.push(Number((offer.id).slice(-1))));

    this._setState({
      stateOffers: offerPoint
    });
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#typeToggleHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationToggleHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceToggleHandler);
    const offers = this.element.querySelectorAll('.event__offer-checkbox');
    offers.forEach((offer)=>offer.addEventListener('change', this.#offersToggleHandler));
  };

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(AddNewPointView.parseStateToPoint(this._state));
  };

  static parsePointToState = (point) => ({...point,
    stateDateFrom: point.dateFrom,
    stateDateTo: point.dateTo,
    stateDestination: point.destination,
    stateType: point.type,
    statePrice: point.basePrice,
    stateOffers: point.offers,
    isDisabled: false,
    isSaving: false,
  });

  static parseStateToPoint = (state) => {
    const point = {...state};

    point.type = point.stateType;
    point.destination = point.stateDestination;
    point.dateFrom = point.stateDateFrom;
    point.dateTo = point.stateDateTo;
    point.basePrice = point.statePrice;
    point.offers = point.stateOffers;

    delete point.stateDestination;
    delete point.stateType;
    delete point.stateDateFrom;
    delete point.stateDateTo;
    delete point.statePrice;
    delete point.stateOffers;
    delete point.isDisabled;
    delete point.isSaving;

    return point;
  };
}

