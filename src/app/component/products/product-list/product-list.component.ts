import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {ActivatedRoute} from '@angular/router';
import {CartItemService} from '../../../services/cart/cart-item.service';
import {CartItem} from '../../../domain/cart/cart-item';
import {Products} from '../../../domain/products/products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public productResponse: Products[] = [];

  currentCategoryId: string | undefined | null;
  previousCategoryId: string | undefined | null;
  searchMode: boolean = false;

  public page: number = 1;
  public pageSize: number = 10;
  public totalNumberOfElement: number = 25;

  constructor(private productService: ProductService, private cartItemService: CartItemService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.getProductsResponse();
    });
  }


  getProductsResponse() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListOfProducts();
    }
  }

  private handleSearchProducts() {
    const keyWord: string | null = this.route.snapshot.paramMap.get('keyword');
    this.productService.searchProducts(keyWord).subscribe(
      data => {
        this.productResponse = data;
      }
    );
  }

  handleListOfProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      this.currentCategoryId = this.route.snapshot.paramMap.get('id');
    } else {
      this.currentCategoryId = 'cc92b736-a726-11eb-bbd2-74d83e98005d';
    }

    if (this.previousCategoryId != this.currentCategoryId) {
      this.page = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    /* return this.productService.getProductsByCategoryPaginate(this.page - 1,
                                                                       this.pageSize,
                                                                       this.currentCategoryId)
                                                                       .subscribe(
                                                                         this.processResult());*/
    return this.productService.getProductsByCategory(this.currentCategoryId).subscribe(
      res => {
        this.productResponse = res;
      }
    );

  }


  addToCart(productItem: Products) {
    const cartItem = new CartItem(productItem);
    this.cartItemService.addToCart(cartItem);

  }
}
