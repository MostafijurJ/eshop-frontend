import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Purchase} from '../../../domain/purchase/purchase';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  private purchaseUri = environment.baseUrl+'purchase';

  constructor(private httpClient: HttpClient) {}

  placeOrder(purchase :Purchase):Observable<any>{
    return this.httpClient.post<Purchase>(this.purchaseUri, purchase);
  }

}
