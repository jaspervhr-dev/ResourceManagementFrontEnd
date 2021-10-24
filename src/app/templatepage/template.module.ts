import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemplateRoutingModule} from './template-routing.module';
import { TemplateComponent } from "./template.component";

@NgModule({
  imports: [
    CommonModule,
    TemplateRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ TemplateComponent ]
})
export class TemplateModule { }
