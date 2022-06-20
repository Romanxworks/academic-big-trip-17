import AddNewPointView from '../view/add-new-point-view.js';
import {render, remove, RenderPosition} from '../framework/render.js';
import {UserAction, UpdateType} from '../const.js';
import {isEscapeKey} from '../utils/date-utils.js';

export default class PointNewPresenter {
  #pointContainer = null;
  #addNewPointComponent = null;
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
    if (this.#addNewPointComponent !== null) {
      return;
    }

    this.#addNewPointComponent = new AddNewPointView(this.#offers, this.#destinations);
    this.#addNewPointComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#addNewPointComponent.setDeleteClickHandler(this.#handleDeleteClick);

    render(this.#addNewPointComponent, this.#pointContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#onEscKeyDown);

  };

  destroy = () => {

    if (this.#addNewPointComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#addNewPointComponent);
    this.#addNewPointComponent = null;

    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #onEscKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.destroy();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  setSaving = () => {
    this.#addNewPointComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  setAborting = () => {
    const resetFormState = () => {
      this.#addNewPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
      });
    };

    this.#addNewPointComponent.shake(resetFormState);
  };


  #handleFormSubmit = (point) => {
    this.#pointChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point
    );

  };

  #handleDeleteClick = () => {
    this.destroy();
  };
}
