import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Country} from '../../../domain/country/country';
import {CountryService} from '../../../services/country/country.service';
import {CardTypeService} from '../../../services/checkoutDetails/card_type/card-type.service';
import {CardType} from '../../../domain/checkoutDetails/card-type';
import {CartItemService} from '../../../services/cart/cart-item.service';
import {PurchaseService} from '../../../services/checkoutDetails/purchase/purchase.service';
import {Router} from '@angular/router';
import {Order} from '../../../domain/order/order';
import {OrderItem} from '../../../domain/orderItem/order-item';
import {Purchase} from '../../../domain/purchase/purchase';

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
              private cardTypeService: CardTypeService, private cartItemService: CartItemService,
              private purchaseService: PurchaseService, private router: Router) {

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

    //TODO setup Order
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    //TODO get cart Items
    const cartItems = this.cartItemService.cartItems;

    //TODO create order items from cartItems
    let orderItems: OrderItem[] = [];
    for (let i = 0; i < cartItems.length; i++) {
      orderItems[i] = new OrderItem(cartItems[i]);
    }

    //TODO generate purchase and customer data from frontend
    let purchase = new Purchase();
    purchase.customer = this.checkoutFormGroup.controls[`customer`].value;
    purchase.shippingAddress = this.checkoutFormGroup.controls[`shippingAddress`].value;
    const country: Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
    purchase.shippingAddress.country = country.name;
    purchase.billingAddress = this.checkoutFormGroup.controls[`billingAddress`].value;
    purchase.billingAddress.country = country.name;

    purchase.order = order;
    purchase.orderItems = orderItems;

    console.log(purchase);

    //TODO rest call via purchase service

    this.purchaseService.placeOrder(purchase).subscribe(
      {
        next: res =>{
          alert(`Your order has been received.\nOrder tracking number: ${res.orderTrackingNumber}`);

          //TODO reset the cart after ordering
          this.reSetCart();
        },
        error: err => {
          alert(`There was an error while ordering : ${err.message}`);
        }
      }
    )

  }

  //TODO reset the cart after ordering
  reSetCart(){
    //reset cart data
    this.cartItemService.cartItems=[];
    this.cartItemService.totalQuantity.next(0);
    this.cartItemService.totalPrice.next(0);

    //reset the form
    this.checkoutFormGroup.reset();

    //back to product page
    this.router.navigateByUrl("/products");
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
