import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../services/http.service";
import {Observable, EMPTY} from 'rxjs';
import {Router} from "@angular/router";

@Component({
  selector: 'resourcepage',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit{

  resourceList: any[] = [];
  extraColumnData: any[] = []

  constructor(private http: HttpService) {  }

  ngOnInit() {
    //Subscribes to (fetchResources) Subject in http services
    console.log("Resource OnInit");
    this.http.fetchResources.subscribe(()=>{
      console.log("Loading Resources...");
      this.loadAllResources();
      this.getColumns();
    });
    //(Above^) will be invoked in this method
    this.http.loadResources();
  }

  loadAllResources(){
    this.http.getRequestNoParams('http://localhost:8080/resources/all')
      .subscribe((response) => {
               console.log('Resource Response Received');
               this.resourceList = response;
      });
  }

  getColumns(){
    this.http.getRequestOneParam('http://localhost:8080/resources/getColumn', "projectId", 1)
      .subscribe((response) => {
        console.log('Resource Response Received');
        this.extraColumnData = response;
        //console.log(this.extraColumnData);
      });
  }

  addResource(){
    var resName = prompt("Enter the name of the new resource: ");
    this.http.postRequestOneParam('http://localhost:8080/resources/add', 'resourceName', resName)
      .subscribe((response) => {
          console.log('Response Received');
          console.log(response);
        },
        (error) => {
          console.log(error);
          console.error('Request failed with error');
        },
        () => {
          console.log('Request completed');
          this.loadAllResources();
        });
  }

  addColumn(){
    var colName = null;
    while(colName == null) {
      colName = prompt("Enter the name of the new column: ");
    }
    this.http.postRequestOneParam('http://localhost:8080/resources/addColumnToAll', "columnName", colName)
      .subscribe((response) => {
        console.log('Response Received');
        //this.extraColumnData.push(response);
        //console.log(this.extraColumnData);
        this.getColumns();
      });
  }

  removeResource(){

  }

  removeColumn(){

  }

}
