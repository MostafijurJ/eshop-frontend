import { Component, OnInit } from '@angular/core';
import {CartItem} from '../../../classes/cart/cart-item';
import {CartItemService} from '../../../services/cart/cart-item.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {
 cartItem: CartItem[] = [];
 totalPrice: string = '';
 totalQuantity: number = 0;

  constructor(private cartItemService : CartItemService) { }

  ngOnInit(): void {
    this.listCartItemDetails();
  }

  private listCartItemDetails() {
    this.cartItem = this.cartItemService.cartItems;
    this.cartItemService.totalPrice.subscribe(price=>{
      this.totalPrice = price.toFixed(2);
    })

    this.cartItemService.totalQuantity.subscribe(quantity =>{
      this.totalQuantity = quantity;
    })

    console.log(`price = ${this.totalPrice} --- quantity = ${this.totalQuantity}`)

    this.cartItemService.computeTotals();
  }
}
