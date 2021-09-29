import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookreaderPageRoutingModule } from './bookreader-routing.module';

import { BookreaderPage } from './bookreader.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookreaderPageRoutingModule
  ],
  declarations: [BookreaderPage]
})
export class BookreaderPageModule {}
