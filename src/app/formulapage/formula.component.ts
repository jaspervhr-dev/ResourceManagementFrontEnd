import {Component, OnInit } from '@angular/core';
import {HttpService} from "../services/http.service";
import {DataService} from "../services/data.service";

@Component({
  selector: 'formula',
  templateUrl: './formula.component.html'
})
export class FormulaComponent implements OnInit {

  resourceList: any[] = [];
  projectId: any;

  constructor(private http: HttpService, private data: DataService) { }

  ngOnInit() {
    this.projectId = this.data.getProjectId();
  }


}
