import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookreaderPage } from './bookreader.page';

const routes: Routes = [
  {
    path: '',
    component: BookreaderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookreaderPageRoutingModule {}
