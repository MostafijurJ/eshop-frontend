import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Credentials} from '../../../domain/user/credentials';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = 'http://localhost:1112/user/login';

  constructor(private httpClient: HttpClient) {}

  loginWithCredentials(credentials: Credentials) : Observable<any> {
    return this.httpClient.post<Credentials>(this.loginUrl, credentials);
  }
}
