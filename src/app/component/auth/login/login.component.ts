import {Component, OnInit} from '@angular/core';
import {Credentials} from '../../../domain/user/credentials';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LoginService} from '../../../services/auth/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form !: FormGroup;
  credentials: Credentials = new Credentials();

  constructor(private formBuilder: FormBuilder, private loginService:LoginService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if((this.credentials.username !="" && this.credentials.password !="")){
      this.loginWithCredentials();
      console.log(`username = ${this.credentials.username} \n password = ${this.credentials.password}`);
    }else {
      console.log(`fields are empty..`)
    }
  }

  loginWithCredentials() {
    this.loginService.loginWithCredentials(this.credentials).subscribe({
      next:response =>{
        alert(`Your login is processing`+response);
      }
    })
  }
}
