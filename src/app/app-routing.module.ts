import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard'

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'ayuntamientos',
    loadChildren: () => import('./pages/ayuntamientos/ayuntamientos.module').then( m => m.AyuntamientosPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'favoritos',
    loadChildren: () => import('./pages/favoritos/favoritos.module').then( m => m.FavoritosPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'contacto',
    loadChildren: () => import('./pages/contacto/contacto.module').then( m => m.ContactoPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'deporte',
    loadChildren: () => import('./pages/deporte/deporte.module').then( m => m.DeportePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'dia',
    loadChildren: () => import('./pages/dia/dia.module').then( m => m.DiaPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'ayuntamiento-l',
    loadChildren: () => import('./pages/ayuntamiento-l/ayuntamiento-l.module').then( m => m.AyuntamientoLPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'ayuntamiento-ld',
    loadChildren: () => import('./pages/ayuntamiento-ld/ayuntamiento-ld.module').then( m => m.AyuntamientoLDPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'ayuntamiento-ldd',
    loadChildren: () => import('./pages/ayuntamiento-ldd/ayuntamiento-ldd.module').then( m => m.AyuntamientoLDDPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'tarjeta',
    loadChildren: () => import('./pages/tarjeta/tarjeta.module').then( m => m.TarjetaPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'informacion',
    loadChildren: () => import('./pages/informacion/informacion.module').then( m => m.InformacionPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'horarios',
    loadChildren: () => import('./pages/horarios/horarios.module').then( m => m.HorariosPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'mis-reservas',
    loadChildren: () => import('./pages/mis-reservas/mis-reservas.module').then( m => m.MisReservasPageModule),
    canActivate: [AuthGuard],
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
