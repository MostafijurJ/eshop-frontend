import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../../domain/customer/customer';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  public customerUrl = environment.baseUrl + 'customers';

  constructor(private httpClient: HttpClient) {
  }

  getAllCustomer() : Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(this.customerUrl);
  }}
