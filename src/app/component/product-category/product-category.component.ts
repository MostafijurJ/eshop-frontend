import {Component, OnInit} from '@angular/core';
import {ProductCategoryService} from '../../services/product-category/product-category.service';
import {ProductCategory} from '../../domain/product-category/product-category';
import {ActivatedRoute} from '@angular/router';
import {Customer} from '../../domain/customer/customer';
import {CustomerService} from '../../services/customers/customer.service';
import {templateJitUrl} from '@angular/compiler';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  public productCategories: ProductCategory[] = [];

  public customers: Customer[] = [];

  constructor(private productCategoryService: ProductCategoryService, private customerService: CustomerService) {}

  ngOnInit(): void {
    this.getProductCategories();
    this.getAllCustomer();
  }

  getProductCategories(){
    this.productCategoryService.getProductsCategories().subscribe(
      responses => {
        this.productCategories = responses;
      }
    );
  }

  getAllCustomer(){
    this.customerService.getAllCustomer().subscribe(response =>{
      this.customers = response;
    })
  }

}
