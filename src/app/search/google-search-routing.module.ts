import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GoogleSearchPage } from './google-search.page';

const routes: Routes = [
  {
    path: '',
    component: GoogleSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoogleSearchPageRoutingModule {}
