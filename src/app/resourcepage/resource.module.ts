import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ResourceRoutingModule} from '../resourcepage/resource-routing.module';
import {ResourceComponent} from "./resource.component";

@NgModule({
  imports: [
    CommonModule,
    ResourceRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ResourceComponent]
})
export class ResourceModule { }
