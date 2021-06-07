import { Component, OnInit } from '@angular/core';

import { AyuntamientoService } from '../../servicios/ayuntamiento.service'
import { ReservasService } from '../../servicios/reservas.service'

import { CallNumber } from '@ionic-native/call-number/ngx'

import { MenuController, ToastController } from '@ionic/angular'
import { Reservas } from 'src/app/clases funcionales/reservas.interface';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.page.html',
  styleUrls: ['./horarios.page.scss'],
})
export class HorariosPage implements OnInit {

  fecha: string
  today = new Date();
  todayS: string
  todayH: string
  reservas = []
  estilos = {}
  si = false
  t = "T"

  coste = []
  horaReserva
  pistaReserva
  ayuntamientoReserva

  constructor(private ayuntaService: AyuntamientoService, private toastCtrl: ToastController, private reservaService: ReservasService, private callNumber: CallNumber, private router: Router, private menuCtrl: MenuController, private usuarioService: UsuarioService) { }

  ionViewDidEnter(): void {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.today.setDate(this.today.getDate())
    this.todayS = this.today.toISOString().substring(0, 10)
    this.todayH = this.today.toString().substring(16, 21)

    this.reservaService.getReservasAyunta(this.ayuntaService.nomAyunta, this.ayuntaService.deporte, this.today.toISOString().substring(0, 10)).subscribe(res => {
      this.reservas = res
      this.estiloHorayReserva()
    })
  }

  estiloHorayReserva() {
    for (let i = 0; i < this.ayuntaService.ayunta[this.ayuntaService.deporte].length; i++) {
      this.estilos[this.ayuntaService.ayunta[this.ayuntaService.deporte][i]] = []
      for (let j = 0; j < this.ayuntaService.ayunta[this.ayuntaService.deporte + this.ayuntaService.ayunta[this.ayuntaService.deporte][i]].length; j++) {
        let busqueda = this.reservas.find(element => element.pista == this.ayuntaService.ayunta[this.ayuntaService.deporte][i] && element.hora.hora == this.ayuntaService.ayunta[this.ayuntaService.deporte + this.ayuntaService.ayunta[this.ayuntaService.deporte][i]][j].hora)
       
        if (this.ayuntaService.ayunta[this.ayuntaService.deporte + this.ayuntaService.ayunta[this.ayuntaService.deporte][i]][j].hora < this.todayH && (this.fecha === undefined || this.fecha.substring(0, 10) == this.todayS)) {
          this.estilos[this.ayuntaService.ayunta[this.ayuntaService.deporte][i]].push({ color: "#ffc409", disabled: true })
        } else if (busqueda) {
          this.estilos[this.ayuntaService.ayunta[this.ayuntaService.deporte][i]].push({ color: "#db0b0b", disabled: true })
        } else {
          this.estilos[this.ayuntaService.ayunta[this.ayuntaService.deporte][i]].push({ color: "white", disabled: false })
        }
      }
    }
 
    this.si = true
  }

  cambioFecha() {
    this.reservaService.getReservasAyunta(this.ayuntaService.nomAyunta, this.ayuntaService.deporte, this.fecha.substring(0, 10)).subscribe(res => {
      this.reservas = res
      this.estiloHorayReserva()

    })
  }
  indicarReserva(hora: string, pista: string, ayuntamiento: string, coste: string) {
    for (let i = 0; i < this.ayuntaService.ayunta[this.ayuntaService.deporte].length; i++) {
    
      if (this.ayuntaService.ayunta[this.ayuntaService.deporte][i] == pista) {
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
  llamar(n: string) {
    this.callNumber.callNumber(n, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
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
