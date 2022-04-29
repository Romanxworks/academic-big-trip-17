import{NewList} from '../view/list-view.js';
import{NewItemList} from '../view/item-list-view.js';
import{NewAddPoint} from '../view/add-new-point-view.js';
import{NewEditPoint} from '../view/edit-point-view.js';
import {render} from '../render.js';

class ListPresenter {
  listComponent = new NewList();

  init = (listContainer) => {
    this.listContainer = listContainer;

    render(this.listComponent, this.listContainer);
    render(new NewEditPoint(), this.listComponent.getElement());
    render(new NewAddPoint(), this.listComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new NewItemList(), this.listComponent.getElement());
    }
  };
}

export{ListPresenter};
