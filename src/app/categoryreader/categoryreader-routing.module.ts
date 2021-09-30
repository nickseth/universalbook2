import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryreaderPage } from './categoryreader.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryreaderPage
  },
  {
    path: 'bookreader/:id', loadChildren:'../bookreader/bookreader.module'
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryreaderPageRoutingModule {}
