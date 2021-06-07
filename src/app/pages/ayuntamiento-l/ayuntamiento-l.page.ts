import { Component, OnInit } from '@angular/core';
import { AyuntamientoService } from '../../servicios/ayuntamiento.service'

import { Router } from "@angular/router"

import { MenuController } from '@ionic/angular'

@Component({
  selector: 'app-ayuntamiento-l',
  templateUrl: './ayuntamiento-l.page.html',
  styleUrls: ['./ayuntamiento-l.page.scss'],
})
export class AyuntamientoLPage implements OnInit {

  ayuntamientosL
  constructor(private ayuntService: AyuntamientoService, private router: Router, private menuCtrl: MenuController) { }

  ionViewDidEnter(): void {
    this.menuCtrl.enable(true);
  }

  // ionViewDidLeave(): void {
  //   this.menuCtrl.enable(false);
  // }

  ngOnInit() {
    this.ayuntService.getAyuntamientoL(this.ayuntService.localidad).subscribe(res => {
      this.ayuntamientosL = res
      console.log(res)
    })
  }

  goToAyunta(data: string) {
    this.ayuntService.nomAyunta = data;
    this.router.navigate(["tarjeta"])
  }

}
