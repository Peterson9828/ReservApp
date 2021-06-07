import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AyuntamientoLDDPageRoutingModule } from './ayuntamiento-ldd-routing.module';

import { AyuntamientoLDDPage } from './ayuntamiento-ldd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AyuntamientoLDDPageRoutingModule
  ],
  declarations: [AyuntamientoLDDPage]
})
export class AyuntamientoLDDPageModule {}
