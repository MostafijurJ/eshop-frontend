import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import {Products} from '../classes/products/products';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public baseUrl = 'http://localhost:1112/products';

  constructor(private httpClient: HttpClient) { }

  getProductList(): Subscription {
    return this.httpClient.get(this.baseUrl).pipe(
      map((data => {
        return new Products(); }))
  ).subscribe(data => console.log('data: ', data));
}
}

// this.httpClient.get('https://jsonplaceholder.typicode.com/posts/1')
//   .pipe(
//     map(
//       data => { return new Article(
//         data['id'],
//         data['title'],
//         data['body']
//       );}
//     )
//   )
//   .subscribe(
//     data => console.log('data: ',data)
//   );

/*
interface GetResponse {
  _embedded: {
    Product: Products[];
  };
}
*/
