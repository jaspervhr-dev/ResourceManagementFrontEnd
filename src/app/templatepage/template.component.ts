import {Component, OnInit } from '@angular/core';
import {HttpService} from "../services/http.service";
import {DataService} from "../services/data.service";

@Component({
  selector: 'template',
  templateUrl: './template.component.html'
})
export class TemplateComponent implements OnInit {

  columnData: any[] = []
  projectId: any;

  constructor(private http: HttpService, private data: DataService) {
  }

  ngOnInit() {
  }


}
