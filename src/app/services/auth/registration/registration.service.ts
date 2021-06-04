import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Credentials} from '../../../domain/user/credentials';
import {Observable} from 'rxjs';
import {Registration} from '../../../domain/user/registration';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private registrationUrl = 'http://localhost:1112/user/register';

  constructor(private httpClient: HttpClient) {}

  registerWithCredentials(credentials: Registration) : Observable<any> {
    return this.httpClient.post<Credentials>(this.registrationUrl, credentials);
  }
}
