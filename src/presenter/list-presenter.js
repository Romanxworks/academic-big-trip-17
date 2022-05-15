import List from '../view/list-view.js';
import ItemList from '../view/item-list-view.js';
import AddEditPoint from '../view/add-edit-point-view.js';
import ListEmpty from '../view/list-empty-view.js';
import ListSort from '../view/list-sort-view.js';
import {render, replace} from '../framework/render.js';

export default class ListPresenter {
  #listComponent = new List();
  #listContainer = null;
  #pointModel = null;
  #pointsList = [];
  #offers = [];
  #listEmpty = new ListEmpty();
  #listSort = new ListSort();

  init = (listContainer, pointModel) => {
    this.#listContainer = listContainer;
    this.#pointModel = pointModel;
    this.#pointsList = [...this.#pointModel.point];
    this.#offers = [...this.#pointModel.offer];

    if(this.#pointsList.length === 0){
      render(this.#listEmpty, this.#listContainer);
    }else{
      render(this.#listSort , this.#listContainer);
      render(this.#listComponent, this.#listContainer);
      for (let i = 0; i < this.#pointsList.length; i++) {
        this.#renderPoint(this.#pointsList[i], this.#offers);
      }
    }
  };

  #renderPoint = (point, offers) => {
    const pointComponent = new ItemList(point, offers);
    const addEditPointComponent = new AddEditPoint(point, offers);

    const replacePointToForm = () => {
      replace(addEditPointComponent, pointComponent);
    };

    const replaceFormToPoint = () => {
      replace(pointComponent, addEditPointComponent);
    };
    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setEditClickHandler(() => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });
    addEditPointComponent.setEditClickHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    addEditPointComponent.setFormSubmitHandler((evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });
    render(pointComponent, this.#listComponent.element);
  };
}

