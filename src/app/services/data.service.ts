import { Injectable } from '@angular/core';


@Injectable()
export class DataService {

  private tranferProjectId: any;

  setProjectId(id: any){
    this.tranferProjectId = id;
  }

  getProjectId(){
    return this.tranferProjectId;
  }
}
