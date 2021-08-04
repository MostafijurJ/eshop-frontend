import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProductCategory} from '../../domain/product-category/product-category';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  public categoryUrl = environment.baseUrl + 'products-category';

  constructor(private httpClient: HttpClient) {
  }

  getProductsCategories() : Observable<ProductCategory[]> {
    return this.httpClient.get<ProductCategory[]>(this.categoryUrl);
  }
}
