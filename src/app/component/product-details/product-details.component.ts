import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute} from '@angular/router';
import {Products} from '../../classes/products/products';
import {CartItemService} from '../../services/cart/cart-item.service';
import {CartItem} from '../../classes/cart/cart-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  products = new Products();

  constructor(private productService: ProductService, private cartItemService: CartItemService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getProductDetails();
  }

  getProductDetails() {
    const productId = this.route.snapshot.paramMap.get('id');
    this.productService.getProductDetailsById(productId).subscribe(
      data => {
        this.products = data;
      }
    );
  }

  addToCart() {
    const  cartItem = new CartItem(this.products);
    this.cartItemService.addToCart(cartItem);
  }
}
