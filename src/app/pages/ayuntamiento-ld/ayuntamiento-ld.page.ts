import { Component, OnInit } from '@angular/core';
import { AyuntamientoService } from '../../servicios/ayuntamiento.service'

import { Router } from "@angular/router"

import { MenuController } from '@ionic/angular'

@Component({
  selector: 'app-ayuntamiento-ld',
  templateUrl: './ayuntamiento-ld.page.html',
  styleUrls: ['./ayuntamiento-ld.page.scss'],
})
export class AyuntamientoLDPage implements OnInit {

  ayuntamientosLD
  constructor(private ayuntService: AyuntamientoService, private router: Router, private menuCtrl: MenuController) { }

  ionViewDidEnter(): void {
    this.menuCtrl.enable(true);
  }

  // ionViewDidLeave(): void {
  //   this.menuCtrl.enable(false);
  // }

  ngOnInit() {
    this.ayuntService.getAyuntamientoLD(this.ayuntService.localidad, this.ayuntService.deporte).subscribe(res => {
      this.ayuntamientosLD = res
      console.log(res)
    })
  }

  goToAyunta(data: string) {
    this.ayuntService.nomAyunta = data;
    this.router.navigate(["tarjeta"])
  }

}
