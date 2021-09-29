import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GoogleSearchPageRoutingModule } from './google-search-routing.module';

import { GoogleSearchPage } from './google-search.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoogleSearchPageRoutingModule,
  
  ],
  declarations: [GoogleSearchPage]
})
export class GoogleSearchPageModule {}
