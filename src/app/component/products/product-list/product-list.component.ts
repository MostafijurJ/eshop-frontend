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
  categoryId: string | undefined | null;
  searchMode: boolean = false;

  constructor(private productService: ProductService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.getData();
    });
  }


  getData() {
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
      this.categoryId = this.route.snapshot.paramMap.get('id');
    } else {
      this.categoryId = 'cc92b736-a726-11eb-bbd2-74d83e98005d';
    }
    this.productService.getProductsData(this.categoryId).subscribe(
      responses => {
        this.productResponse = responses;
        console.log(this.productResponse);
      }
    );
  }

}
