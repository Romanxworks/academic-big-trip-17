import ItemListView from '../view/item-list-view.js';
import EditPointView from '../view/edit-point-view.js';
import {render, replace, remove} from '../framework/render.js';
import {UserAction, UpdateType} from '../const.js';
import {isEscapeKey} from '../utils/date-utils.js';
const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #pointContainer = null;
  #pointComponent = null;
  #EditPointComponent = null;
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
    const preEditPointComponent = this.#EditPointComponent;

    this.#pointComponent = new ItemListView(this.#point, this.#offers);
    this.#EditPointComponent = new EditPointView( this.#offers, this.#destinations, this.#point);

    this.#pointComponent.setEditClickHandler(this.#handleToEditClick);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#EditPointComponent.setEditClickHandler(this.#handleToPointClick);
    this.#EditPointComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#EditPointComponent.setDeleteClickHandler(this.#handleDeleteClick);

    if (prePointComponent === null || preEditPointComponent === null) {
      render(this.#pointComponent, this.#pointContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prePointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointComponent, preEditPointComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prePointComponent);
    remove(preEditPointComponent);
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#EditPointComponent);
  };

  setSaving = () => {
    if (this.#mode === Mode.EDITING) {
      this.#EditPointComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  };

  setDeleting = () => {
    if (this.#mode === Mode.EDITING) {
      this.#EditPointComponent.updateElement({
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
      this.#EditPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#EditPointComponent.shake(resetFormState);
  };

  #replacePointToForm = () => {
    replace(this.#EditPointComponent, this.#pointComponent);
    this.#modeChange();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#EditPointComponent);
    this.#mode = Mode.DEFAULT;
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#EditPointComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  };

  #onEscKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#EditPointComponent.reset(this.#point);
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
