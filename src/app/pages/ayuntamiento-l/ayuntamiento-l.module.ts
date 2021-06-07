import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AyuntamientoLPageRoutingModule } from './ayuntamiento-l-routing.module';

import { AyuntamientoLPage } from './ayuntamiento-l.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AyuntamientoLPageRoutingModule
  ],
  declarations: [AyuntamientoLPage]
})
export class AyuntamientoLPageModule {}
