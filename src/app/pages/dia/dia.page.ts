import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router"

import { AyuntamientoService } from '../../servicios/ayuntamiento.service'

import { MenuController } from '@ionic/angular'

@Component({
  selector: 'app-dia',
  templateUrl: './dia.page.html',
  styleUrls: ['./dia.page.scss'],
})
export class DiaPage implements OnInit {

  fecha: string
  today = new Date();
  todayS: string

  constructor(private router: Router, private ayuntamientoService: AyuntamientoService, private menuCtrl: MenuController) { }

  ionViewDidEnter(): void {
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
    this.today.setDate(this.today.getDate())
    this.todayS = this.today.toISOString().substring(0, 10)
  }

  buscar() {
    if (this.fecha) {
      this.fecha = this.fecha.substring(0, 10)
      this.ayuntamientoService.dia = this.fecha
      this.router.navigate(["/ayuntamiento-ldd"])
    }
  }
}
