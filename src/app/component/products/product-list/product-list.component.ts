import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {IProduct} from '../../../interface/IProduct';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public productResponse: IProduct[] = [];

  currentCategoryId: string | undefined | null;
  previousCategoryId: string | undefined | null;
  searchMode: boolean = false;

 public page: number = 1;
  public pageSize: number = 10;
  public totalNumberOfElement: number = 25;

  constructor(private productService: ProductService, private route: ActivatedRoute) {
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
    console.log(`current cat id = ${this.previousCategoryId}`);

   /* return this.productService.getProductsByCategoryPaginate(this.page - 1,
                                                                      this.pageSize,
                                                                      this.currentCategoryId)
                                                                      .subscribe(
                                                                        this.processResult());*/
    return this.productService.getProductsByCategory(this.currentCategoryId).subscribe(
    res =>{
      this.productResponse = res;
    }
      )

  }

/*  processResult(){
    return (data: IProduct) =>{
      this._productResponseSingle = data;
      this.page = data.page+1;
      this.pageSize = data.pageSize;
      this.totalNumberOfElement =data.totalNumberOfElement;

    }
  }*/

}
