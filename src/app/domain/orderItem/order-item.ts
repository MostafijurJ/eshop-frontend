import {CartItem} from '../cart/cart-item';

export class OrderItem {
  imageUrl !: string;
  productId !: string;
  unitPrice !: number;
  quantity !: number;

  constructor(cartItem: CartItem) {
    this.imageUrl = cartItem.imgUri;
    this.productId = cartItem.id;
    this.unitPrice = cartItem.unitPrice;
    this.quantity = cartItem.quantity;
  }
}
