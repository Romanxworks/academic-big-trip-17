import {createElement} from '../render.js';
import {CITIES} from '../mock/const.js';
import {pointDateAddEdit} from '../utils.js';

const destinationNameTemplate = (name)=>`<option value="${name}"></option>`;
const destinationName = ()=>CITIES.map((name)=>destinationNameTemplate(name)).join('');

const pictureTemplate = (src)=>`<img class="event__photo" src="${src}" alt="Event photo">`;
const picturesTemplate = (pictures)=>pictures.map((picture)=>pictureTemplate(picture.src)).join('');
const checkSection = (element)=> element? ''  :'visually-hidden';

const createAddEditPointTemplate = (point, allOffers = [])=>{
  const {basePrice = 1100,
    dateFrom = '2019-07-10T22:55:56.845Z',
    dateTo= '2019-07-11T11:22:13.375Z',
    destination= {
      description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
      name: 'Chamonix',
      pictures: [
        {
          src: 'http://picsum.photos/300/200?r=0.0762563005163317',
          description: 'Chamonix parliament building'
        }
      ]
    },
    type: pointType ='taxi',
    offers:offersPoint=[]
  } = point;

  const offerElementTemplate = (element) =>{
    const offreLabel = ((element.title).split(' ')[0]).toLowerCase();
    if(offersPoint.includes(element.id)){
      return (`<div class="event__offer-selector">
         <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offreLabel}" type="checkbox" name="event-offer-${offreLabel}" checked>
          <label class="event__offer-label" for="event-offer-${offreLabel}">
          <span class="event__offer-title">${element.title}</span>
           &plus;&euro;&nbsp;
          <span class="event__offer-price">${element.price}</span>
          </label>
      </div>`
      );}else{
      return (`<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offreLabel}" type="checkbox" name="event-offer-${offreLabel}">
         <label class="event__offer-label" for="event-offer-${offreLabel}">
         <span class="event__offer-title">${element.title}</span>
          &plus;&euro;&nbsp;
         <span class="event__offer-price">${element.price}</span>
         </label>
     </div>`
      );
    }};
  const pointTypeOffer = ()=>allOffers.find((element) =>element.type === pointType);
  const pointOffer = ()=>pointTypeOffer()?pointTypeOffer().offers.map(offerElementTemplate).join(''):'';
  return (`<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${pointType}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>

                        <div class="event__type-item">
                          <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                          <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                          <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                          <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                          <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                          <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                          <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                          <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                          <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                          <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                        </div>
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                    ${pointType}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${destinationName()}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${pointDateAddEdit(dateFrom)}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${pointDateAddEdit(dateTo)}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
               
                <section class="event__section  event__section--offers ${checkSection(allOffers)}">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                    ${pointOffer()}
                  </section>

                  <section class="event__section  event__section--destination ${checkSection(point)}">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${destination.description}</p>

                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                      ${picturesTemplate(destination.pictures)}
                        
                        <img class="event__photo" src="img/photos/5.jpg" alt="Event photo">
                      </div>
                    </div>
                  </section>
                </section>
              </form>
            </li>`
  );};


class AddEditPoint {
  #element = null;
  #point = null;
  #offer = null;

  constructor(point, offer){
    this.#offer = offer;
    this.#point = point;
  }

  get template() {
    return createAddEditPointTemplate(this.#point, this.#offer);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}

export{AddEditPoint};
