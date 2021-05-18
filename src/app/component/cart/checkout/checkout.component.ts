import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Country} from '../../../domain/country/country';
import {CountryService} from '../../../services/country/country.service';
import {CardTypeService} from '../../../services/checkoutDetails/card-type.service';
import {CardType} from '../../../domain/checkoutDetails/card-type';
import {CartItemService} from '../../../services/cart/cart-item.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  countries: Country[] = [];
  cardTypes: CardType[] = [];
  checkoutFormGroup!: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private formBuilder: FormBuilder, private countryService: CountryService,
              private cardTypeService: CardTypeService, private cartItemService: CartItemService) {

  }

  ngOnInit(): void {
    this.getAllCounties();
    this.getAllCardTypes();
    this.updateCartStatus();

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        /* firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
         lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
         email: new FormControl('',
           [Validators.required,
             Validators.pattern('^[a-z0-9.%+-]+@[a-z0-9.-]+\\.[a-z]{2-4}$')]),*/
        firstName: [''],
        lastName: [''],
        email: ['']

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

  updateCartStatus() {
    this.cartItemService.totalPrice.subscribe(response => {
      this.totalPrice = response;
    });
    this.cartItemService.totalQuantity.subscribe(response => {
      this.totalQuantity = response;
    });
  }

  /* get firstName() {
     return this.checkoutFormGroup.get('customer.firstName');
   }

   get lastName() {
     return this.checkoutFormGroup.get('customer.lastName');
   }

   get email() {
     return this.checkoutFormGroup.get('customer.email');
   }*/

}
