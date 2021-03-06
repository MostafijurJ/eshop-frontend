import {Injectable} from '@angular/core';
import {CartItem} from '../../domain/cart/cart-item';
import {ReplaySubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartItemService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new ReplaySubject<number>();
  totalQuantity: Subject<number> = new ReplaySubject<number>();

  constructor() {
  }

  addToCart(cartItem: CartItem) {
    //TODO to check if the item already exist in cart
    let alreadyExistItem: boolean = false;
    let existingItem: CartItem;

    if (this.cartItems.length > 0) {

      //TODO finding the cart based on cart id
      for (let tempCartItem of this.cartItems) {
        if (tempCartItem.id == cartItem.id) {
          existingItem = tempCartItem;
          break;
        }
      }

      //TODO check if the items found
      // @ts-ignore
      alreadyExistItem = (existingItem != undefined);
    }

    if (alreadyExistItem){
      // @ts-ignore
      existingItem.quantity++;
    }else {
      this.cartItems.push(cartItem);
    }

    this.computeTotals();

  }

  //TODO calculating total price
  computeTotals(){
    let totalPriceValue : number = 0;
    let totalQuantityValue : number = 0;
    for (let currentItem of this.cartItems){
      totalPriceValue += currentItem.quantity * currentItem.unitPrice;
      totalQuantityValue  += currentItem.quantity;
    }

    //TODO publish the new value into cart
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }

  decrementQuantity(item: CartItem) {
    item.quantity--;

    if (item.quantity==0){
      this.removeItem(item);
    }
    else{
      this.computeTotals();
    }
  }

  public removeItem(item: CartItem) {
    const itemIndex = this.cartItems.findIndex(tempItem => tempItem.id === item.id);

    if (itemIndex > -1){
      this.cartItems.splice(itemIndex,1);
      this.computeTotals();
    }
  }
}
