import { Injectable } from '@angular/core';


@Injectable()
export class DataService {

  private tranferProjectId: any;
  private pageName: any;

  setProjectId(id: any){
    this.tranferProjectId = id;
  }

  getProjectId(){
    return this.tranferProjectId;
  }

  setPageName(pn: any){
    this.pageName = pn;
  }

  getPageName(){
    return this.pageName;
  }
}
