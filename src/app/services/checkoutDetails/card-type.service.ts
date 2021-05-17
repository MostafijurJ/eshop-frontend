import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CardType} from '../../domain/checkoutDetails/card-type';

@Injectable({
  providedIn: 'root'
})
export class CardTypeService {

  public categoryUrl = 'http://localhost:1112/card-type';

  constructor(private httpClient: HttpClient) {
  }

  getAllCardType() : Observable<CardType[]> {
    return this.httpClient.get<CardType[]>(this.categoryUrl);
  }
}
