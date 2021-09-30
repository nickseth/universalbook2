import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ReadnotePageRoutingModule } from './readnote-routing.module';

import { ReadnotePage } from './readnote.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReadnotePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ReadnotePage]
})
export class ReadnotePageModule {}
