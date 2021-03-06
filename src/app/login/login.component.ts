import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {JwtService} from "../services/jwt.service";
import {HttpService} from "../services/http.service";


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {
  form:FormGroup;

  constructor(private fb:FormBuilder,
              private jwtService: JwtService,
              private http: HttpService) {

    this.form = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    });

    // @ts-ignore
    document.getElementById('sidebar').hidden = true;
  }

  login() {
    const val = this.form.value;

    if (val.username && val.password) {
      this.jwtService.login(val.username, val.password)
        .subscribe((response) => {
            console.log('Response Received');
            //console.log(response);
            this.jwtService.setSession(response);
            // @ts-ignore
            document.getElementById('sidebar').hidden = false;
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
