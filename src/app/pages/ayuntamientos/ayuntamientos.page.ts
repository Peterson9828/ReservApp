import { Component, OnInit } from '@angular/core';

import { AyuntamientoService } from '../../servicios/ayuntamiento.service'

import { Router } from "@angular/router"

import { MenuController } from '@ionic/angular'

@Component({
  selector: 'app-ayuntamientos',
  templateUrl: './ayuntamientos.page.html',
  styleUrls: ['./ayuntamientos.page.scss'],
})
export class AyuntamientosPage implements OnInit {

  items: any;
  ayuntas = [];

  constructor(private router: Router, private ayuntService: AyuntamientoService, private menuCtrl: MenuController) { }

  ionViewDidEnter(): void {
    this.menuCtrl.enable(true);
  }

  // ionViewDidLeave(): void {
  //   this.menuCtrl.enable(false);
  // }

  ngOnInit() {
    this.ayuntService.getAyuntamientos().subscribe(res => {
      this.ayuntas = res
      this.initializeItems();
    })
  }

  initializeItems() {
    this.items = this.ayuntas
  }

  getItems(event: any) {
    this.initializeItems();

    let val = event.target.value;

    if (val && val.trim() != '') {
      this.items = this.items.filter((res) => {
        return (res.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1)
      })
    }
  }

  goToAyunta(data: string) {
    this.ayuntService.nomAyunta = data;
    this.router.navigate(["tarjeta"])
  }

}
