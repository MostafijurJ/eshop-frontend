import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../../../services/customers/customer.service';
import {Customer} from '../../../domain/customer/customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customers: Customer[] = [];

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getAllCustomer();
  }

  getAllCustomer(){
    this.customerService.getAllCustomer().subscribe(response =>{
      this.customers = response;
    })
  }

}
