import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AyuntamientosPageRoutingModule } from './ayuntamientos-routing.module';

import { AyuntamientosPage } from './ayuntamientos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AyuntamientosPageRoutingModule
  ],
  declarations: [AyuntamientosPage]
})
export class AyuntamientosPageModule {}
