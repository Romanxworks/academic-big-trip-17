import{List} from '../view/list-view.js';
import{ItemList} from '../view/item-list-view.js';
import{AddNewPoint} from '../view/add-new-point-view.js';
import{EditPoint} from '../view/edit-point-view.js';
import {render} from '../render.js';

const COUNT_LI= 3;
class ListPresenter {
  listComponent = new List();

  init = (listContainer) => {
    this.listContainer = listContainer;

    render(this.listComponent, this.listContainer);
    render(new EditPoint(), this.listComponent.getElement());
    render(new AddNewPoint(), this.listComponent.getElement());

    for (let i = 0; i < COUNT_LI; i++) {
      render(new ItemList(), this.listComponent.getElement());
    }
  };
}

export{ListPresenter};
