import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Purchase} from '../../../domain/purchase/purchase';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  private purchaseUri = 'http://localhost:1112/purchase';

  constructor(private httpClient: HttpClient) {}

  placeOrder(purchase :Purchase):Observable<any>{
    return this.httpClient.post<Purchase>(this.purchaseUri, purchase);
  }

}
