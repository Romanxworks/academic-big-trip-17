import AbstractView from '../framework/view/abstract-view.js';

const createNewListFilterItemTemplate = (filter) =>{
  const {name} = filter;
  return (`<div class="trip-filters__filter">
  <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}">
  <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
</div>`);
};

const createNewListFilterTemplate = (filters)=>{
  const AllFilters = filters.map((filter) => createNewListFilterItemTemplate(filter)).join('');
  return ( `<form class="trip-filters" action="#" method="get">
  ${AllFilters}
                <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class ListFilter extends AbstractView {
  #filters = null;

  constructor(filters){
    super();
    this.#filters = filters;
  }

  get template() {
    return createNewListFilterTemplate(this.#filters);
  }
}

