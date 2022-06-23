import AbstractView from '../framework/view/abstract-view.js';
import {getDateDayMonth, getSumElements} from '../utils/date-utils.js';

const MIN_LENGTH = 2;

const getPointPrice = (points) => {
  const totalPrice = [];
  points.map((point) => totalPrice.push(point.basePrice));
  const price = getSumElements(totalPrice);
  return price;
};

const getOffersPointPrice = (points, offers) =>{
  const offersPointPrice = [];
  points.map((point) =>
    offers.map((offer) =>{
      if(point.type===offer.type){
        offer.offers.map((offerPointType) =>
          point.offers.map((id) => {
            if(id === offerPointType.id){
              offersPointPrice.push(offerPointType.price);
            }})
        );
      }
    }
    )
  );
  return offersPointPrice;
};

const createNewTripInfoTemplate = (points , offers)=>{

  const lastIndex = points.length - 1;
  const basePrice = getPointPrice(points);
  const dateStart = getDateDayMonth(points[0].dateFrom);
  const dateEnd = getDateDayMonth(points[lastIndex].dateTo);
  const offersPrice = getOffersPointPrice(points , offers);
  const allOffersePrice = getSumElements(offersPrice);
  const price = basePrice + allOffersePrice;

  return(
    `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${points[0].destination.name} &mdash; ${points.length === MIN_LENGTH ? points[1].destination.name:'...' } &mdash; ${points[lastIndex].destination.name}</h1>

      <p class="trip-info__dates">${dateStart}&nbsp;&mdash;&nbsp;${dateEnd}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
    </p>
  </section>`
  );
};

export default class TripInfoView extends AbstractView{
  #points = null;
  #offers = null;

  constructor(points, offers){
    super();
    this.#points = points;
    this.#offers = offers;
  }

  get template() {
    return createNewTripInfoTemplate(this.#points, this.#offers);
  }

}
