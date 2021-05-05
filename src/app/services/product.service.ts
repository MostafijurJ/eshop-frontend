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

  getProductsData(categoryId: string | null): Observable<IProduct[]> {
    const searchUrl = `${this.baseUrl}/category?categoryId=${categoryId}`;
    return this.httpClient.get<IProduct[]>(searchUrl);
  }

  searchProducts(keyWord: string | null): Observable<IProduct[]> {
    const searchUrl = `${this.baseUrl}/search?name=${keyWord}`;
    return this.httpClient.get<IProduct[]>(searchUrl);
  }

  getProductDetailsById(productId: string | null): Observable<Products>{
    const productDetailsUrl = `${this.baseUrl}/${productId}`;
    return this.httpClient.get<Products>(productDetailsUrl);
  }

}
