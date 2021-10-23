import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FormulaRoutingModule} from '../formulapage/formula-routing.module';
import {FormulaComponent} from "./formula.component";

@NgModule({
  imports: [
    CommonModule,
    FormulaRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [FormulaComponent]
})
export class FormulaModule { }
