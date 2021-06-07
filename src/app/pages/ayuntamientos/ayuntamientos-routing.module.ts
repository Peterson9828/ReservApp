import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AyuntamientosPage } from './ayuntamientos.page';

const routes: Routes = [
  {
    path: '',
    component: AyuntamientosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AyuntamientosPageRoutingModule {}
