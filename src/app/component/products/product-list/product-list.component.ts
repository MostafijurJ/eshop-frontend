import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {IProduct} from '../../../interface/IProduct';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

 public productResponse : IProduct[] = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
  this.getData();
  }

  getData() {
    this.productService.getProductsData().subscribe(
      responses => {
        this.productResponse =responses;
        console.log(this.productResponse);
      }
    );
  }
}
