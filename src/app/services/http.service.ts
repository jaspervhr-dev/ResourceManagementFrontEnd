import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient){}
  public fetchResources = new Subject();

  getRequestNoParams(path:string): Observable<any>{
    return this.http.get(path);
  }

  loadResources(){
    console.log("...");
    this.fetchResources.next();
  }
}
