import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResourceComponent } from './resource.component';


const routes: Routes = [
  {
    path: 'resources',
    component: ResourceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResourceRoutingModule {}
