import {Component, OnInit } from '@angular/core';
import {HttpService} from "../services/http.service";
import {DataService} from "../services/data.service";

@Component({
  selector: 'temp',
  templateUrl: './template.component.html'
})
export class TemplateComponent implements OnInit {

  columnData: any[] = [];
  projectId: any;
  newColumnName: string | null = null;

  constructor(private http: HttpService, private data: DataService) { }

  ngOnInit() {
    this.projectId = this.data.getProjectId();
    this.loadColumns();
  }

  loadColumns(){
    this.http.getRequestOneParam('http://localhost:8080/resources/getColumn', "projectId", this.projectId)
      .subscribe((response) => {
        console.log('Column Response Received');
        this.columnData = response;
        //console.log(this.extraColumnData);
      });
  }

  addCustomColumn(){
    this.newColumnName = prompt("Enter the column name: ")
    this.http.postRequestWithTwoParams('http://localhost:8080/resources/addColumn', "columnName", this.newColumnName, "projectId", this.projectId)
      .subscribe((response) => {
        console.log('Column created');
        this.columnData.push(response);
        //console.log(this.extraColumnData);
      });
  }

  removeCustomColumn(){
    this.http.deleteRequestWithTwoParams('http://localhost:8080/resources/deleteColumn', "columnName", this.newColumnName, "projectId", this.projectId)
      .subscribe((response) => {
        console.log('Column removed');
        this.columnData.push(response);
        //console.log(this.extraColumnData);
      });
  }

  //TODO Find a way to flag columns so that they aren't shown in the formula page
}
