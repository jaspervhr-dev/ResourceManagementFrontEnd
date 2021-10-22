import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../services/http.service";
import {Router} from "@angular/router";


@Component({
  selector: 'signup',
  templateUrl: './signup.component.html'
})
export class SignUpComponent {
  signupform:FormGroup;

  constructor(private fb:FormBuilder,
              private http: HttpService,
              private router: Router) {

    this.signupform = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  signup() {
    const val = this.signupform.value;

    if (val.username && val.password) {
      this.http.postRequestWithTwoParams("http://localhost:8080/user/createUser", "username", val.username, "password", val.password)
        .subscribe((response) => {
            console.log('User Created');
            this.router.navigateByUrl('/login/login');
          },
          (error) => {
            console.log(error);
            console.error('Request failed with error');
          },
          () => {
            console.log('Request completed');
          });
    }

  }
}
