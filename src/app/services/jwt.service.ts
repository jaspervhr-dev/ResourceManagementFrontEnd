import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";


@Injectable()
export class JwtService {

  constructor(private http: HttpClient, private router: Router) {}

  login(username:string, password:string): Observable<any> {
    const bodyJSON = {"username": username, "password": password};
    const body = JSON.stringify(bodyJSON);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/user/login', body, {responseType: 'text', 'headers':headers});
  }

  //Called from the response of http request above in the login component
  public setSession(response: string) {
    localStorage.setItem('token', response);
    //console.log(localStorage.getItem('token'));
    this.router.navigate(['/res/resources']);
  }
}
