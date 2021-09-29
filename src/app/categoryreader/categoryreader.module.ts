import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryreaderPageRoutingModule } from './categoryreader-routing.module';

import { CategoryreaderPage } from './categoryreader.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryreaderPageRoutingModule
  ],
  declarations: [CategoryreaderPage]
})
export class CategoryreaderPageModule {}
