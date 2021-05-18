import {Component, OnInit} from '@angular/core';
import {ProductCategoryService} from '../../services/product-category.service';
import {ProductCategory} from '../../domain/product-category';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  public productCategories: ProductCategory[] = [];

  constructor(private productCategoryService: ProductCategoryService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getProductCategories();
  }

  getProductCategories(){
    this.productCategoryService.getProductsCategories().subscribe(
      responses => {
        this.productCategories = responses;
      }
    );
  }
}
