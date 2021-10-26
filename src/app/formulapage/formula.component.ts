import {Component, OnInit } from '@angular/core';
import {HttpService} from "../services/http.service";
import {DataService} from "../services/data.service";

@Component({
  selector: 'formula',
  templateUrl: './formula.component.html',
  styleUrls: ['./formula.component.css']
})
export class FormulaComponent implements OnInit {

  resourceList: any[] = [];
  columnData: any[] = [];
  columnValues: any[] = [];
  projectId: any;

  constructor(private http: HttpService, private data: DataService) { }

  ngOnInit() {
    this.projectId = this.data.getProjectId();
    this.loadProject();
    this.getColumns();
  }

  loadProject(){
    this.http.getRequestOneParam('http://localhost:8080/project/getprojectresources', "projectId", this.projectId)
      .subscribe((response) => {
        console.log('Resource Response Received');
        this.resourceList = response;
      });
  }

  getColumns(){
    this.http.getRequestOneParam('http://localhost:8080/resources/getColumn', "projectId", this.projectId)
      .subscribe((response) => {
        console.log('Column Response Received');
        this.columnData = response;
        this.fillColumnData();
      });
  }

  fillColumnData(){
    let resVals = [];
    for(let i = 0; i < this.resourceList.length; i++){
      let colVal: string[] = [];
      for(let c = 0; c < this.columnData.length; c++){
        this.http.getRequestThreeParams('http://localhost:8080/resources/columnValue', "resourceId", this.resourceList[i].resourceId,"projectId", this.projectId, "columnName", this.columnData[c].columnName)
          .then((response) => {
            console.log('Column Data Loaded');
            console.log(this.columnData[c].columnName, response);
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
    var columnName = this.columnData[columnIndex].columnName;
    if(this.columnValues[resourceIndex][columnIndex] != ""){
      this.modifyValue(newVal, columnName, resourceId);
    }
    this.http.postRequestFourParams('http://localhost:8080/resources/addColumnValue', "columnValue", newVal,"columnName",columnName,"resourceId", resourceId,"projectId", this.projectId)
      .subscribe((response) => {
          console.log('Column Val Received');
          this.fillColumnData();
        });
  }

  modifyValue(colVal: any, colName: string, resourceId: any){
    this.http.postRequestFourParams('http://localhost:8080/resources/updateColumnValue', "columnValue", colVal,"columnName",colName,"resourceId", resourceId,"projectId", this.projectId)
      .subscribe((response) => {
        console.log('Column Val Updated');
        this.fillColumnData();
      });
  }



}
