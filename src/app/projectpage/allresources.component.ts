import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../services/http.service";
import {Router} from "@angular/router";

@Component({
  selector: 'allresources',
  templateUrl: './allresources.component.html'
})
export class AllResourcesComponent implements OnInit {

  resourceList: any[] = [];

  constructor(private http: HttpService) {}

  ngOnInit() {
    console.log("Project OnInit");

    this.http.fetchResources.subscribe(()=>{
      console.log("Loading All Resources...");
      this.loadAllResources();
    });
    //(Above^) will be invoked in this method
    this.http.loadResources();
  }

  loadAllResources() {
    this.http.getRequestNoParams('http://localhost:8080/resources/all')
      .subscribe((response) => {
        console.log('Resource Response Received');
        this.resourceList = response;
      });
  }
}
