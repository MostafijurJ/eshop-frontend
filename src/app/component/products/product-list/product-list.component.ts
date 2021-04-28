import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {Products} from '../../../classes/products/products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Products[] = [];
  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.listProducts();
  }

  // tslint:disable-next-line:typedef
  listProducts(){
      this.productService.getProductList().subscribe(
        data => {
          this.products = data;
        }
      );
  }

}
