import {Component, OnInit } from '@angular/core';
import {HttpService} from "../services/http.service";
import {JwtService} from "../services/jwt.service";
import {DataService} from "../services/data.service";

@Component({
  selector: 'projectresources',
  templateUrl: './projectresources.component.html'
})
export class ProjectResourcesComponent implements OnInit {

  resourceList: any[] = [];
  projectList: any[] = [];
  selectedProjectId: number | undefined;
  select: any | null;

  constructor(private http: HttpService, private jwt: JwtService, private data: DataService) {  }

  ngOnInit() {
    this.loadProjects();
    //Custom event listener to trigger whenever the project selection changes
    this.select = document.querySelector('#projects');
    this.select.addEventListener('change', () =>{
      this.loadProject();
    });
  }

  loadProjects(){
    this.http.getRequestOneParam('http://localhost:8080/project/allprojects', "username", this.jwt.username)
      .subscribe((response) => {
        console.log('Project Response Received');
        this.projectList = response;
        //Automatically load the first project if it exists
        if(this.projectList.length != 0) {
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

  createProject(){
    this.http.postRequestOneParam('http://localhost:8080/project/createproject', "username", this.jwt.username)
      .subscribe((response) => {
        console.log('Project Created');
        this.loadProjects();
      });
  }

  deleteProject(){
    this.http.postRequestOneParam('http://localhost:8080/project/deleteproject', "projectId", this.selectedProjectId)
      .subscribe((response) => {
        console.log('Project Deleted');
        this.loadProjects();
      });
  }

  addResourcesToProject(){
    var resIds = prompt("Enter a list of resource Ids: ");
    this.http.postRequestWithTwoParamsText('http://localhost:8080/project/addresources', 'resourceIds', resIds, 'projectId', this.selectedProjectId)
      .subscribe((response) => {
        console.log('Resources Added');
        this.loadProject();
      },
        error => {this.loadProject()});
  }

  removeResourcesFromProject(){
    var resIds = prompt("Enter a list of resource Ids: ");
    this.http.deleteRequestWithTwoParams('http://localhost:8080/project/removeResources', 'resourceIds', resIds, 'projectId', this.selectedProjectId)
      .subscribe((response) => {
        console.log('Resources Removed');
        this.loadProject();
      },
        error => {this.loadProject()});
  }

  tranferProjectId(){
    this.data.setProjectId(this.selectedProjectId);
  }
}
