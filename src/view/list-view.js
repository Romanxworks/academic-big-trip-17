import {createElement} from '../render.js';

const createNewListTemplate = ()=>'<ul class="trip-events__list"></ul>';


class List {
  #element = null;
  get template() {
    return createNewListTemplate();
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

export{List};
