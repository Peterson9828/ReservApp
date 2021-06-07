import { Component, OnInit } from '@angular/core';
import { Ayuntamiento } from 'src/app/clases funcionales/ayuntamiento.interfaz';
import { AyuntamientoService } from '../../servicios/ayuntamiento.service'

import { Usuario } from 'src/app/clases funcionales/usuario.interface';
import { DeportesService } from '../../servicios/deportes.service'
import { AuthService } from '../../servicios/auth.service'

import { MenuController } from '@ionic/angular'
import { Router } from "@angular/router"

@Component({
  selector: 'app-deporte',
  templateUrl: './deporte.page.html',
  styleUrls: ['./deporte.page.scss'],
})
export class DeportePage implements OnInit {

  items: any;
  deportes = [];
  val
  deporte
  list = false;
  estilo = {
    'top': '35%'
  }

  constructor(private ayuntService: AyuntamientoService, private sportService: DeportesService, private authService: AuthService, private menuCtrl: MenuController, private router: Router) { }

  ionViewDidEnter(): void {
    this.menuCtrl.enable(true);
  }

  // ionViewDidLeave(): void {
  //   this.menuCtrl.enable(false);
  // }

  ngOnInit() {
    this.sportService.getDeportes().subscribe(res => {
      this.deportes = res[0].deportes

      this.initializeItems();
    })
  }

  initializeItems() {
    this.items = this.deportes
  }

  getItems(event: any) {
    this.initializeItems();

    this.val = event.target.value;

    if (this.val && this.val.trim() != '') {
      this.list = true
      console.log('lleno')
      this.items = this.items.filter((res) => {
        return (res.toLowerCase().indexOf(this.val.toLowerCase()) > -1)
      })
    } else {
      console.log('vacio')
      this.list = false
    }
  }

  siguiente() {
    if (this.deporte) {
      const resultado = this.deportes.find(deportes => deportes.toLowerCase() === this.deporte.toLowerCase());
      if (resultado) {
        this.ayuntService.deporte = this.deporte.toLowerCase()
        this.router.navigate(["/dia"])
      }
    }
  }

  buscar() {
    if (this.deporte) {
      const resultado = this.deportes.find(deportes => deportes.toLowerCase() === this.deporte.toLowerCase());
      if (resultado) {
        this.ayuntService.deporte = this.deporte.toLowerCase()
        this.router.navigate(["/ayuntamiento-ld"])
      }
    }
  }

  subir() {
    this.estilo = { 'top': '0%' }
    console.log('subir')
  }

  bajar() {
    if (!this.val) {
      this.estilo = { 'top': '35%' }
    }
    console.log('bajar')
  }

  elegirDeporte(deporte){
    this.deporte = deporte
  }

}
