import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AyuntamientoLDPage } from './ayuntamiento-ld.page';

const routes: Routes = [
  {
    path: '',
    component: AyuntamientoLDPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AyuntamientoLDPageRoutingModule {}
