import{List} from '../view/list-view.js';
import{ItemList} from '../view/item-list-view.js';
import{AddEditPoint} from '../view/add-edit-point-view.js';
import {render} from '../render.js';

class ListPresenter {
  listComponent = new List();

  init = (listContainer, pointModel) => {
    this.listContainer = listContainer;
    this.pointModel = pointModel;
    this.pointsList = [...this.pointModel.getPoint()];
    this.offers = [...this.pointModel.getOffer()];
    this.destination = [...this.pointModel.getDestination()];

    render(this.listComponent, this.listContainer);
    render(new AddEditPoint(this.offers[0], this.destination[1]), this.listComponent.getElement());

    for (let i = 0; i < this.pointsList.length; i++) {
      render(new ItemList(this.pointsList[i],this.offers), this.listComponent.getElement());
    }
  };
}

export{ListPresenter};
