import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AllResourcesComponent} from "./allresources.component";
import {ProjectResourcesComponent} from "./projectresources.component";


const routes: Routes = [
  {
    path: 'projects',
    component: AllResourcesComponent,
    children: [
      { path: 'pr', component: ProjectResourcesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule {}
