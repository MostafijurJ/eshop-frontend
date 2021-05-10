import {Component, OnInit} from '@angular/core';
import {CartItemService} from '../../../services/cart/cart-item.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  totalPrice: string = '0.00';

  totalQuantity: number = 0;

  constructor(private cartItemService: CartItemService) {
  }

  ngOnInit(): void {
    this.updateCartStatus();
  }

  private updateCartStatus() {
    this.cartItemService.totalPrice.subscribe(data => {
      this.totalPrice = data.toFixed(2);
    });

    this.cartItemService.totalQuantity.subscribe(data => {
      this.totalQuantity = data;
    });
  }
}
