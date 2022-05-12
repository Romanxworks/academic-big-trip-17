import List from '../view/list-view.js';
import ItemList from '../view/item-list-view.js';
import AddEditPoint from '../view/add-edit-point-view.js';
import {render} from '../render.js';

export default class ListPresenter {
  #listComponent = new List();
  #listContainer = null;
  #pointModel = null;
  #pointsList = [];
  #offers = [];

  init = (listContainer, pointModel) => {
    this.#listContainer = listContainer;
    this.#pointModel = pointModel;
    this.#pointsList = [...this.#pointModel.point];
    this.#offers = [...this.#pointModel.offer];

    render(this.#listComponent, this.#listContainer);

    for (let i = 0; i < this.#pointsList.length; i++) {
      this.#renderPoint(this.#pointsList[i], this.#offers);
    }
  };

  #renderPoint = (point, offers) => {
    const pointComponent = new ItemList(point, offers);
    const addEditPointComponent = new AddEditPoint(point, offers);

    const replacePointToForm = () => {
      this.#listComponent.element.replaceChild(addEditPointComponent.element, pointComponent.element);
    };

    const replaceFormToPoint = () => {
      this.#listComponent.element.replaceChild(pointComponent.element, addEditPointComponent.element);
    };
    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });
    addEditPointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    addEditPointComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });
    render(pointComponent, this.#listComponent.element);
  };
}

