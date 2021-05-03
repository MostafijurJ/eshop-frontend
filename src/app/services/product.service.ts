import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IProduct} from '../interface/IProduct';

@Injectable()
export class ProductService {
  public baseUrl = 'http://localhost:1112/products';

  constructor(private httpClient: HttpClient) {
  }

  getProductsData(categoryId: string) : Observable<IProduct[]> {
    const searchUrl = this.baseUrl+'/'+categoryId;
    return this.httpClient.get<IProduct[]>(searchUrl);
  }

}
