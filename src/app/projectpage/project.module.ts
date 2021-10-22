import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProjectRoutingModule} from './project-routing.module';
import {ProjectResourcesComponent} from "./projectresources.component";
import {AllResourcesComponent} from "./allresources.component";

@NgModule({
  imports: [
    CommonModule,
    ProjectRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [AllResourcesComponent, ProjectResourcesComponent]
})
export class ProjectModule { }
