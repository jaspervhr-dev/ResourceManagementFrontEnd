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
  extraColumnData: any[] = [];
  columnValues: any[] = [];

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
        this.fillColumnData();
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

  removeResource() {
    var resId = prompt("Enter the ID of the resource you'd like to delete: ");
    this.http.deleteOneParam('http://localhost:8080/resources/deleteresource', 'resourceId', resId)
      .subscribe((response) => {
          console.log('Resource Deleted');
          console.log(response);
          this.loadAllResources();
      });
  }


  removeColumn(){
    var colName = prompt("Enter the name of the column you'd like to delete: ");
    this.http.deleteRequestWithTwoParams('http://localhost:8080/resources/deleteColumn', 'columnName', colName, "projectId", 1)
      .subscribe((response) => {
        console.log('Resource Deleted');
        console.log(response);
        this.getColumns();
      });
  }

  fillColumnData(){
    let resVals = [];
    for(let i = 0; i < this.resourceList.length; i++){
      let colVal: string[] = [];
      for(let c = 0; c < this.extraColumnData.length; c++){
        this.http.getRequestThreeParams('http://localhost:8080/resources/columnValue', "resourceId", this.resourceList[i].resourceId,"projectId", 1, "columnName", this.extraColumnData[c].columnName)
          .then((response) => {
              console.log('Column Data Loaded');
              console.log(this.extraColumnData[c].columnName, response);
              colVal.push(response);
            },
            ()=>{
              console.log("Column does not have a value");
              colVal.push("");
            });
      }
      resVals.push(colVal);
    }
    this.columnValues = resVals;
    console.log(this.columnValues);
  }

  updateColumnValue(resourceId: any, columnIndex: any){
    var newVal = prompt("Enter the new value: ");

    //Get the index of the resource
    var resourceIndex = 0;
    for(let i = 0; i < this.resourceList.length; i++){
      if(this.resourceList[i].resourceId == resourceId){
        resourceIndex = i;
      }
    }
    var columnName = this.extraColumnData[columnIndex].columnName;
    if(this.columnValues[resourceIndex][columnIndex] != ""){
      this.modifyValue(newVal, columnName, resourceId);
    }
    this.http.postRequestFourParams('http://localhost:8080/resources/addColumnValue', "columnValue", newVal,"columnName",columnName,"resourceId", resourceId,"projectId", 1)
      .subscribe((response) => {
        console.log('Column Val Received');
        this.fillColumnData();
      });
  }

  modifyValue(colVal: any, colName: string, resourceId: any){
    this.http.postRequestFourParams('http://localhost:8080/resources/updateColumnValue', "columnValue", colVal,"columnName",colName,"resourceId", resourceId,"projectId", 1)
      .subscribe((response) => {
        console.log('Column Val Updated');
        this.fillColumnData();
      });
  }

}
