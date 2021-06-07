import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AyuntamientoLPage } from './ayuntamiento-l.page';

const routes: Routes = [
  {
    path: '',
    component: AyuntamientoLPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AyuntamientoLPageRoutingModule {}
