import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    //If this is a login request, do not attempt to get token
    if(req.url.includes("/user/login")){
      return next.handle(req);
    }
    const jwtToken = localStorage.getItem("token");
    //If no token exists, return handle the request as is
    if (jwtToken) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization",
          "Bearer " + jwtToken)
      });
      //If the token does exist, add the token and handle the modified request
      return next.handle(cloned);
    }
    else {
      return next.handle(req);
    }
  }
}
