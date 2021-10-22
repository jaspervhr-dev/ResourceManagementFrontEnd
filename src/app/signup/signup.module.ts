import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SignUpRoutingModule} from './signup-routing.module';
import {SignUpComponent} from "./signup.component";

@NgModule({
  imports: [
    CommonModule,
    SignUpRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [SignUpComponent]
})
export class SignUpModule { }
