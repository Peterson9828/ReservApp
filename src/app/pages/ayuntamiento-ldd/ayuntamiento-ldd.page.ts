import { Component, OnInit } from '@angular/core';

import { ReservasService } from "../../servicios/reservas.service"
import { AyuntamientoService } from '../../servicios/ayuntamiento.service'
import { UsuarioService } from '../../servicios/usuario.service'

import { Ayuntamiento } from 'src/app/clases funcionales/ayuntamiento.interfaz';

import { MenuController, ToastController } from '@ionic/angular'
import { Reservas } from 'src/app/clases funcionales/reservas.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ayuntamiento-ldd',
  templateUrl: './ayuntamiento-ldd.page.html',
  styleUrls: ['./ayuntamiento-ldd.page.scss'],
})
export class AyuntamientoLDDPage implements OnInit {

  horarioPistas = []
  ayunta: Ayuntamiento
  ayuntamientosLDD = []
  reservas = []
  horaReserva
  pistaReserva
  ayuntamientoReserva
  coste = []
  t = "T"
  constructor(private reservaService: ReservasService, public ayuntaService: AyuntamientoService, private toastCtrl: ToastController, private menuCtrl: MenuController, private usuarioService: UsuarioService, private router: Router) { }

  today = new Date();
  todayS: string
  todayD: string

  ionViewDidEnter(): void {
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
    this.today.setDate(this.today.getDate())
    this.todayS = this.today.toString().substring(16, 21)
    this.todayD = this.today.toISOString().substring(0, 10)

    this.ayuntaService.getAyuntamientoLD(this.ayuntaService.localidad, this.ayuntaService.deporte).subscribe(res => {
      this.ayuntamientosLDD = res

      for(let num = 0; num<this.ayuntamientosLDD.length; num++){
        if(this.ayuntamientosLDD[num].festivos.find(element => element == this.todayD)){
          this.ayuntamientosLDD.splice(num, 1)
          num--
        }
      }

      this.reservaService.getReservas(this.ayuntaService.deporte, this.ayuntaService.localidad, this.ayuntaService.dia).subscribe(rest => {
        this.reservas = rest
        for (let i = 0; i < this.reservas.length; i++) {
          let ayuntamiento = this.ayuntamientosLDD.find(element => element.nombre == this.reservas[i].idAyuntamiento)
          let indexHoraDelete = ayuntamiento[this.ayuntaService.deporte + this.reservas[i].pista].findIndex(element => element.hora == this.reservas[i].hora.hora);

          if (indexHoraDelete >= 0) {
            let index = this.ayuntamientosLDD.map(function (e) { return e.nombre; }).indexOf(ayuntamiento.nombre);
            this.ayuntamientosLDD[index][this.ayuntaService.deporte + this.reservas[i].pista].splice(indexHoraDelete, 1)
          }

        }
      })
    })
  }

  indicarReserva(hora: string, pista: string, ayuntamiento: string, coste: string) {
    for (let i = 0; i < this.ayuntamientosLDD.length; i++) {
      if (this.ayuntamientosLDD[i].nombre == ayuntamiento) {
        this.coste[i] = coste + "€"
      } else {
        this.coste[i] = 'no'
      }
    }

    this.horaReserva = hora
    this.pistaReserva = pista
    this.ayuntamientoReserva = ayuntamiento

  }

  reservar() {
    let reserva: Reservas = {
      id: "",
      idAyuntamiento: this.ayuntamientoReserva,
      localizacion: this.ayuntaService.localidad,
      deporte: this.ayuntaService.deporte,
      pista: this.pistaReserva,
      dia: this.ayuntaService.dia,
      hora: this.horaReserva,
      emailReservante: this.usuarioService.email,
      nombreReservante: this.usuarioService.nombre
    }

    this.reservaService.addReserva(reserva).then(res => {
      reserva.id = res.id
      this.reservaService.updateReserva(reserva, reserva.id)
      this.popReservar()
      this.router.navigate(["/home"])
    })
  }

  async popReservar() {
    const toast = await this.toastCtrl.create({
      message: 'Reserva realizada correctamente',
      animated: true,
      color: "primary",
      duration: 1000,
    });
    toast.present();
  }
}
