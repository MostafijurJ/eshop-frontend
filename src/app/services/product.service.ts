import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IProduct} from '../interface/IProduct';
import {Products} from '../classes/products/products';

@Injectable()
export class ProductService {
  public baseUrl = 'http://localhost:1112/products';

  constructor(private httpClient: HttpClient) {
  }

  getProductsByCategory(categoryId: string | null): Observable<IProduct[]> {
    const searchUrl = `${this.baseUrl}/category?categoryId=${categoryId}`;
    return this.httpClient.get<IProduct[]>(searchUrl);
  }

  //TODO for getting products list with pagination
  getProductsByCategoryPaginate(thePage: number, pageSize: number,
                                categoryId: string | null): Observable<IProduct> {
    const searchUrl = `${this.baseUrl}/category?categoryId=${categoryId}`
      + `&page=${thePage}&size=${pageSize}`;
    return this.httpClient.get<IProduct>(searchUrl);
  }

  searchProducts(keyWord: string | null): Observable<IProduct[]> {
    const searchUrl = `${this.baseUrl}/search?name=${keyWord}`;
    return this.httpClient.get<IProduct[]>(searchUrl);
  }

  getProductDetailsById(productId: string | null): Observable<IProduct> {
    const productDetailsUrl = `${this.baseUrl}/${productId}`;
    return this.httpClient.get<IProduct>(productDetailsUrl);
  }

}
