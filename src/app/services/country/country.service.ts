import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Country} from '../../domain/country/country';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  public categoryUrl = environment.baseUrl + 'country';

  constructor(private httpClient: HttpClient) {
  }

  getAllCountries() : Observable<Country[]> {
    return this.httpClient.get<Country[]>(this.categoryUrl);
  }
}
