import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../../domain/customer/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  public customerUrl = 'http://localhost:1112/customers';

  constructor(private httpClient: HttpClient) {
  }

  getAllCustomer() : Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(this.customerUrl);
  }}
