import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CalendarviewPageRoutingModule } from './calendarview-routing.module';
import { CalendarviewPage } from './calendarview.page';

 import { NgCalendarModule  } from 'ionic2-calendar';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgCalendarModule,
    CalendarviewPageRoutingModule,
 
  ],
  declarations: [CalendarviewPage]
})
export class CalendarviewPageModule {}
