import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarviewPage } from './calendarview.page';

const routes: Routes = [
  {
    path: '',
    component: CalendarviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarviewPageRoutingModule {}
