import {Component, OnInit} from '@angular/core';
import {Registration} from '../../../domain/user/registration';
import {RegistrationService} from '../../../services/auth/registration/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registration: Registration = new Registration();

  constructor(private registrationService: RegistrationService) {}

  ngOnInit(): void {
  }

  onSubmit() {
    if ((this.registration.email != '' && this.registration.password != '')) {
      this.registerWithInfo();
    } else {
      console.log(`fields are empty..`);
    }
  }

  registerWithInfo() {
    return this.registrationService.registerWithCredentials(this.registration).subscribe({
      next: response => {
        alert(`your registration is processing : ${response}`);
      },
      error: err => {
        alert(`There was an error while registration : ${err.message}`);
      }
    });
  }

}
