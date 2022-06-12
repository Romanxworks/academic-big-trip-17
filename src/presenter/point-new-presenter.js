import AddEditPoint from '../view/add-edit-point-view.js';
import {render, remove, RenderPosition} from '../framework/render.js';
import {UserAction, UpdateType} from '../const.js';
import {nanoid} from 'nanoid';

export default class PointNewPresenter {
  #pointContainer = null;
  #addEditPointComponent = null;
  #point = null;
  #offers = null;
  #destinations = null;
  #pointChange = null;
  #destroyCallback = null;

  constructor(pointContainer, pointChange) {
    this.#pointContainer = pointContainer;
    this.#pointChange = pointChange;
  }

  init = (callback, offers, destinations) =>{
    this.#destroyCallback = callback;
    this.#offers = offers;
    this.#destinations = destinations;
    if (this.#addEditPointComponent !== null) {
      return;
    }

    this.#addEditPointComponent = new AddEditPoint(this.#offers, this.#destinations);
    this.#addEditPointComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#addEditPointComponent.setDeleteClickHandler(this.#handleDeleteClick);

    render(this.#addEditPointComponent, this.#pointContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#onEscKeyDown);

  };

  destroy = () => {

    if (this.#addEditPointComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#addEditPointComponent);
    this.#addEditPointComponent = null;

    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };


  #handleFormSubmit = (point) => {
    this.#pointChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {...point, id: nanoid()},
    );
    this.destroy();
  };


  #handleDeleteClick = () => {
    this.destroy();
  };
}
