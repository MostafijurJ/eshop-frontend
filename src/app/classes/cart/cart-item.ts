import {IProduct} from '../../interface/IProduct';

export class CartItem {

  id: string;
  name: string;
  imgUri: string;
  unitPrice: number;

  quantity: number;

  constructor(product: IProduct) {
    this.id = product.id;
    this.name = product.name;
    this.imgUri = product.imageUrl;
    this.unitPrice = product.unitPrice;
    this.quantity = 1;
  }


}

