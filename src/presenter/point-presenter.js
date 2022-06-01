import ItemList from '../view/item-list-view.js';
import AddEditPoint from '../view/add-edit-point-view.js';
import {render, replace, remove} from '../framework/render.js';

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

  init = (point, offers, destinations) =>{
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;

    const prePointComponent = this.#pointComponent;
    const preAddEditPointComponent = this.#addEditPointComponent;

    this.#pointComponent = new ItemList(this.#point, this.#offers);
    this.#addEditPointComponent = new AddEditPoint(this.#point, this.#offers, this.#destinations);

    this.#pointComponent.setEditClickHandler(this.#handleToEditClick);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#addEditPointComponent.setEditClickHandler(this.#handleToPointClick);
    this.#addEditPointComponent.setFormSubmitHandler(this.#handleFormSubmit);

    if (prePointComponent === null || preAddEditPointComponent === null) {
      render(this.#pointComponent, this.#pointContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prePointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#addEditPointComponent, preAddEditPointComponent);
    }

    remove(prePointComponent);
    remove(preAddEditPointComponent);
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#addEditPointComponent);
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
      this.#replaceFormToPoint();
    }
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
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
  };

  #handleFormSubmit = (point) => {
    this.#pointChange(point);
    this.#replaceFormToPoint();
  };

  #handleFavoriteClick = () => {
    this.#pointChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };
}
