import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AyuntamientoLDPageRoutingModule } from './ayuntamiento-ld-routing.module';

import { AyuntamientoLDPage } from './ayuntamiento-ld.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AyuntamientoLDPageRoutingModule
  ],
  declarations: [AyuntamientoLDPage]
})
export class AyuntamientoLDPageModule {}
