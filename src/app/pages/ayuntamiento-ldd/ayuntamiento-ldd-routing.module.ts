import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AyuntamientoLDDPage } from './ayuntamiento-ldd.page';

const routes: Routes = [
  {
    path: '',
    component: AyuntamientoLDDPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AyuntamientoLDDPageRoutingModule {}
