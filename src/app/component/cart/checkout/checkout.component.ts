import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Country} from '../../../domain/country/country';
import {CountryService} from '../../../services/country/country.service';
import {CardTypeService} from '../../../services/checkoutDetails/card-type.service';
import {CardType} from '../../../domain/checkoutDetails/card-type';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  countries: Country[] = [];
  cardTypes: CardType[] = [];
  checkoutFormGroup: FormGroup;
  totalPrice: string = '0.00';
  totalQuantity: number = 0;

  constructor(private formBuilder: FormBuilder, private countryService: CountryService, private cardTypeService: CardTypeService) {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
      }),
      shippingAddress: this.formBuilder.group({
        city: [''],
        address: [''],
        zipCode: [''],
        country: [''],
      }),
      billingAddress: this.formBuilder.group({
        city: [''],
        address: [''],
        zipCode: [''],
        country: [''],
      }),
      cardInfo: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expiryDate: [''],
      })
    });
  }

  ngOnInit(): void {
    this.getAllCounties();
    this.getAllCardTypes();
  }

  //TODO to retrieve all countries from backend
  getAllCounties() {
    this.countryService.getAllCountries().subscribe(response => {
      this.countries = response;
    });
  }

  //TODO to retrieve all card Types from backend
  getAllCardTypes() {
    this.cardTypeService.getAllCardType().subscribe(response => {
      this.cardTypes = response;
    });
  }

  onSubmit() {
    console.log(this.checkoutFormGroup.get(`customer`)?.value);
  }

  copyShippingAddressToBillingAddress(event: any) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress.setValue(this.checkoutFormGroup.controls.shippingAddress.value);
    } else {
      this.checkoutFormGroup.controls.billingAddress.reset();
    }
  }
}
