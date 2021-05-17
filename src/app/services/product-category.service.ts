import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProductCategory} from '../domain/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  public categoryUrl = 'http://localhost:1112/products-category';

  constructor(private httpClient: HttpClient) {
  }

  getProductsCategories() : Observable<ProductCategory[]> {
    return this.httpClient.get<ProductCategory[]>(this.categoryUrl);
  }
}
