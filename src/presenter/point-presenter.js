import ItemList from '../view/item-list-view.js';
import AddEditPoint from '../view/add-edit-point-view.js';
import {render, replace, remove} from '../framework/render.js';
import {UserAction, UpdateType} from '../const.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #pointContainer = null;
  #pointComponent = null;
  #addEditPointComponent = null;
  #point = null;
  #offers = null;
  #destinations = null;
  #pointChange = null;
  #modeChange = null;
  #mode = Mode.DEFAULT;

  constructor(pointContainer, pointChange, modeChange) {
    this.#pointContainer = pointContainer;
    this.#pointChange = pointChange;
    this.#modeChange = modeChange;
  }

  init = (offers, destinations, point) =>{
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;

    const prePointComponent = this.#pointComponent;
    const preAddEditPointComponent = this.#addEditPointComponent;

    this.#pointComponent = new ItemList(this.#point, this.#offers);
    this.#addEditPointComponent = new AddEditPoint( this.#offers, this.#destinations, this.#point);

    this.#pointComponent.setEditClickHandler(this.#handleToEditClick);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#addEditPointComponent.setEditClickHandler(this.#handleToPointClick);
    this.#addEditPointComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#addEditPointComponent.setDeleteClickHandler(this.#handleDeleteClick);

    if (prePointComponent === null || preAddEditPointComponent === null) {
      render(this.#pointComponent, this.#pointContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prePointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointComponent, preAddEditPointComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prePointComponent);
    remove(preAddEditPointComponent);
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#addEditPointComponent);
  };

  setSaving = () => {
    if (this.#mode === Mode.EDITING) {
      this.#addEditPointComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  };

  setDeleting = () => {
    if (this.#mode === Mode.EDITING) {
      this.#addEditPointComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  };

  setAborting = () => {
    if (this.#mode === Mode.DEFAULT) {
      this.#pointComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#addEditPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#addEditPointComponent.shake(resetFormState);
  };

  #replacePointToForm = () => {
    replace(this.#addEditPointComponent, this.#pointComponent);
    this.#modeChange();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#addEditPointComponent);
    this.#mode = Mode.DEFAULT;
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#addEditPointComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#addEditPointComponent.reset(this.#point);
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #handleToEditClick = () => {
    this.#replacePointToForm();
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #handleToPointClick = () => {
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #handleFormSubmit = (update) => {
    const isMinorUpdate = this.#point.type !== update.type ||
this.#point.destination.name !== update.destination.name;

    this.#pointChange(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update
    );
  };

  #handleFavoriteClick = () => {
    this.#pointChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {...this.#point, isFavorite: !this.#point.isFavorite}
    );
  };

  #handleDeleteClick = (point) => {
    this.#pointChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };
}
