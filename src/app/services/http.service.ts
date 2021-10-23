import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient){}
  public fetchResources = new Subject();

  getRequestNoParams(path:string): Observable<any>{
    return this.http.get(path, {responseType: 'json'});
  }

  loadResources(){
    this.fetchResources.next();
  }

  postRequestOneParam(path:string, paramKey: string, paramVal: any): Observable<any>{
    const params = new HttpParams()
      .set(paramKey, paramVal);
    return this.http.post(path,'',{params, responseType: 'text'});
  }

  getRequestOneParam(path:string, paramKey: string, paramVal: any): Observable<any>{
    const params = new HttpParams()
      .set(paramKey, paramVal);
    return this.http.get(path,{params, responseType: 'json'});
  }

  postRequestWithTwoParams(path:string, pKey1:string, pVal1:any, pKey2:string, pVal2:any){
  const params = new HttpParams()
    .set(pKey1, pVal1)
    .set(pKey2, pVal2);

    return this.http.post(path, '', {params, responseType: 'json'});
  }

  postRequestWithTwoParamsText(path:string, pKey1:string, pVal1:any, pKey2:string, pVal2:any){
    const params = new HttpParams()
      .set(pKey1, pVal1)
      .set(pKey2, pVal2);
    return this.http.post(path, '', {params, responseType: 'text'});
  }

  deleteRequestWithTwoParams(path:string, pKey1:string, pVal1:any, pKey2:string, pVal2:any){
    const params = new HttpParams()
      .set(pKey1, pVal1)
      .set(pKey2, pVal2);

    return this.http.delete(path,{params, responseType: 'text'});
  }

  deleteRequestWithOneParam(path:string, pKey1:string, pVal1:any){
    const params = new HttpParams()
      .set(pKey1, pVal1);
    return this.http.delete(path,{params, responseType: 'text'});
  }

}
