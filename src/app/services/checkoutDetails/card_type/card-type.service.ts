import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CardType} from '../../../domain/checkoutDetails/card-type';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardTypeService {

  public categoryUrl = environment.baseUrl +'card-type';

  constructor(private httpClient: HttpClient) {
  }

  getAllCardType() : Observable<CardType[]> {
    return this.httpClient.get<CardType[]>(this.categoryUrl);
  }
}
