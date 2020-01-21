import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaxiPageRoutingModule } from './taxi-routing.module';

import { TaxiPage } from './taxi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaxiPageRoutingModule
  ],
  declarations: [TaxiPage]
})
export class TaxiPageModule {}
