import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup: FormGroup;
  totalPrice: string = '0.00';
  totalQuantity: number = 0;

  constructor(private formBuilder: FormBuilder) {
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
