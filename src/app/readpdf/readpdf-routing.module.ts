import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReadpdfPage } from './readpdf.page';

const routes: Routes = [
  {
    path: '',
    component: ReadpdfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReadpdfPageRoutingModule {}
