import { Component, OnInit } from '@angular/core';
import {Registration} from '../../../domain/user/registration';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registration: Registration = new Registration();
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {

  }
}
