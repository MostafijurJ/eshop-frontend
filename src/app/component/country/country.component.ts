import { Component, OnInit } from '@angular/core';
import {CountryService} from '../../services/country/country.service';
import {Country} from '../../domain/country/country';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  countries: Country[] = [];

  constructor(private countryService: CountryService) { }
  ngOnInit(): void {
    this.getCountries();
  }

  getCountries(){
    this.countryService.getAllCountries().subscribe(res=>{
      this.countries = res;
    })
  }
}
