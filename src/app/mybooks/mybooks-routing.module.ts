import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MybooksPage } from './mybooks.page';

const routes: Routes = [
  {
    path: '',
    component: MybooksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MybooksPageRoutingModule {}
