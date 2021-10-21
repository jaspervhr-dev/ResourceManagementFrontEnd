import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../services/http.service";
import {Router} from "@angular/router";

@Component({
  selector: 'resourcepage',
  templateUrl: './resource.component.html'
})
export class ResourceComponent implements OnInit{

  resourceList: any;

  constructor(private http: HttpService) {}

  ngOnInit() {
    //Subscribes to (fetchResources) Subject in http services
    //It will be invoked once login in completed in login.component
    this.http.fetchResources.subscribe(()=>{
      console.log("Loading Resources...");
      this.http.getRequestNoParams('http://localhost:8080/resources/all')
        .subscribe((response) => {
            console.log('Response Received');
            this.resourceList = response;
            //sessionStorage.setItem("resources",response);
            //console.log(this.resourceList);
          },
          (error) => {
            console.log(error);
            console.error('Request failed with error');
          },
          () => {
            console.log('Request completed');
          });
    });
  }

  resources(){
    console.log(this.resourceList);
  }

}
