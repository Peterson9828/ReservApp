import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../../servicios/usuario.service'
import { ReservasService } from '../../servicios/reservas.service'
import { AyuntamientoService } from '../../servicios/ayuntamiento.service'

import { MenuController } from '@ionic/angular'

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.page.html',
  styleUrls: ['./mis-reservas.page.scss'],
})
export class MisReservasPage implements OnInit {

  reservas = []
  ayuntas = []
  si = false
  
  constructor(private userService: UsuarioService, private reserService: ReservasService, private ayuntService: AyuntamientoService, private menuCtrl: MenuController) {
  }

  ionViewDidEnter(): void {
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
    if (this.reservas.length == 0) {
      this.mostrarReservas()
    }
    console.log(this.userService.email)
  }

  cancelarReserva(id: string, i: number) {
    this.reservas.splice(i, 1)
    this.ayuntas.splice(i, 1)
    this.reserService.removeReserva(id).then(res => {
      // this.mostrarReservas()
    })
  }

  mostrarReservas() {
    this.ayuntas = []
    this.reserService.getReservasByEmail(this.userService.email).subscribe(res => {
      this.reservas = res
      console.log(this.reservas)
      for (let i = 0; i < this.reservas.length; i++) {
        this.ayuntService.getAyuntamientoByName(this.reservas[i].idAyuntamiento).subscribe(rest => {
          this.ayuntas.push(rest[0])
          console.log(i)
          console.log(this.reservas.length)
          if(this.reservas.length == (i + 1)){
            console.log('h')
            this.si = true
          }
        })
      }
      console.log(this.ayuntas)
    })
  }

}
