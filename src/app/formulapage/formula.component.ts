import {Component, OnInit } from '@angular/core';
import {HttpService} from "../services/http.service";
import {DataService} from "../services/data.service";

@Component({
  selector: 'formula',
  templateUrl: './formula.component.html'
})
export class FormulaComponent implements OnInit {

  resourceList: any[] = [];
  columnData: any[] = []
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
        console.log('Resource Response Received');
        this.columnData = response;
        //console.log(this.extraColumnData);
      });
  }



}
