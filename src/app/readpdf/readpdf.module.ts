import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReadpdfPageRoutingModule } from './readpdf-routing.module';

import { ReadpdfPage } from './readpdf.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReadpdfPageRoutingModule
  ],
  declarations: [ReadpdfPage]
})
export class ReadpdfPageModule {}
