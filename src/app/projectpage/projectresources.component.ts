import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../services/http.service";
import {Router} from "@angular/router";
import {JwtService} from "../services/jwt.service";

@Component({
  selector: 'projectresources',
  templateUrl: './projectresources.component.html'
})
export class ProjectResourcesComponent implements OnInit {

  resourceList: any[] = [];
  projectList: any[] = [];
  selectedProjectId: any;

  constructor(private http: HttpService, private jwt: JwtService) { }

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects(){
    this.http.getRequestOneParam('http://localhost:8080/project/allprojects', "username", this.jwt.username)
      .subscribe((response) => {
        console.log('Project Response Received');
        this.projectList = response;
        //Automatically load the first project if it exists
        if(this.projectList != null) {
          this.selectedProjectId = this.projectList[0].projectId;
          this.loadProject();
        }
      });
  }

  loadProject(){
    this.http.getRequestOneParam('http://localhost:8080/project/getprojectresources', "projectId", this.selectedProjectId)
      .subscribe((response) => {
        console.log('Resource Response Received');
        this.resourceList = response;
      });
  }

  addResourcesToProject(){

  }
}
