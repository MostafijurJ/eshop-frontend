import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Products} from '../../domain/products/products';
import {environment} from '../../../environments/environment';

@Injectable()
export class ProductService {
  public baseUrl = environment.baseUrl + 'products';

  constructor(private httpClient: HttpClient) {
  }

  getProductsByCategory(categoryId: string | null): Observable<Products[]> {
    const searchUrl = `${this.baseUrl}/category?categoryId=${categoryId}`;
    return this.httpClient.get<Products[]>(searchUrl);
  }

  //TODO for getting products list with pagination
  getProductsByCategoryPaginate(thePage: number, pageSize: number,
                                categoryId: string | null): Observable<Products> {
    const searchUrl = `${this.baseUrl}/category?categoryId=${categoryId}`
      + `&page=${thePage}&size=${pageSize}`;
    return this.httpClient.get<Products>(searchUrl);
  }

  searchProducts(keyWord: string | null): Observable<Products[]> {
    const searchUrl = `${this.baseUrl}/search?name=${keyWord}`;
    return this.httpClient.get<Products[]>(searchUrl);
  }

  getProductDetailsById(productId: string | null): Observable<Products> {
    const productDetailsUrl = `${this.baseUrl}/${productId}`;
    return this.httpClient.get<Products>(productDetailsUrl);
  }

}
