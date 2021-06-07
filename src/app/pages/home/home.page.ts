import { Component, OnInit } from '@angular/core';

import { AyuntamientoService } from '../../servicios/ayuntamiento.service'
import { LocalizacionService } from '../../servicios/localizacion.service'
import { UsuarioService } from '../../servicios/usuario.service'
import { AuthService } from '../../servicios/auth.service'

import { MenuController } from '@ionic/angular'
import { Router } from "@angular/router"


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  items: any;
  localidades = [];

  list = false;
  val
  ciudad: string
  estilo = {
    'top': '35%'
  }

  constructor(private menuCtrl: MenuController, private router: Router, private localService: LocalizacionService, private ayuntService: AyuntamientoService, private userService: UsuarioService, private authService: AuthService) { }

  ionViewDidEnter(): void {
    this.menuCtrl.enable(true);
    this.ciudad = ''
    this.val = ''
    this.list = false
    this.bajar()
  }

  ngOnInit() {

    this.menuCtrl.enable(true)

    if (this.userService.flag) {
      this.userService.getUsuarioByEmail(this.userService.email).subscribe(rest => {
        this.userService.nombre = rest[0].nombre
        this.userService.apellidos = rest[0].apellidos
        this.userService.email = rest[0].email

      })
    } else {
      this.authService.getUserAuth().subscribe(res => {
        if (res) {
          this.userService.nombre = res.displayName
          this.userService.email = res.email
        }

      })
    }

    this.localService.getCiudades().subscribe(res => {
      this.localidades = res[0].localidades
      this.initializeItems();
    })
  }

  initializeItems() {
    this.items = this.localidades
  }

  getItems(event: any) {
    this.initializeItems();

    this.val = event.target.value;

    if (this.val && this.val.trim() != '') {
      this.list = true
      this.items = this.items.filter((res) => {
        return (res.toLowerCase().indexOf(this.val.toLowerCase()) > -1)
      })
    } else {
      this.list = false
    }
  }

  siguiente() {
    if (this.ciudad) {
      const resultado = this.localidades.find(localidades => localidades.toLowerCase() === this.ciudad.toLowerCase());
      if (resultado) {
        this.ciudad = this.ciudad.toString().substring(0, 1).toUpperCase() + this.ciudad.toString().substring(1).toLowerCase()
        this.ayuntService.localidad = this.ciudad
        this.router.navigate(["/deporte"])
      }
    }
  }

  buscar() {
    if (this.ciudad) {
      const resultado = this.localidades.find(localidades => localidades.toLowerCase() === this.ciudad.toLowerCase());
      if (resultado) {
        this.ciudad = this.ciudad.toString().substring(0, 1).toUpperCase() + this.ciudad.toString().substring(1).toLowerCase()
        this.ayuntService.localidad = this.ciudad
        this.router.navigate(["/ayuntamiento-l"])
      }
    }

  }

  subir() {
    this.estilo = { 'top': '0%' }
  }

  bajar() {
    if (!this.val) {
      this.estilo = { 'top': '35%' }
    }
  }

  elegirCiudad(ciudad) {
    this.ciudad = ciudad
  }
}
