import {createElement} from '../render.js';

const createNewListTemplate = ()=>'<ul class="trip-events__list"></ul>';


class List {
  getTemplate() {
    return createNewListTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

export{List};
