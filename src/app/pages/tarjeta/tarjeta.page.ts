import { Component, OnInit } from '@angular/core';

import { AyuntamientoService } from '../../servicios/ayuntamiento.service'
import { Ayuntamiento } from '../../clases funcionales/ayuntamiento.interfaz'

import { Router } from "@angular/router"

import { MenuController } from '@ionic/angular'

import { CallNumber } from '@ionic-native/call-number/ngx'

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.page.html',
  styleUrls: ['./tarjeta.page.scss'],
})
export class TarjetaPage implements OnInit {

  constructor(private ayuntService: AyuntamientoService, private router: Router, private callNumber: CallNumber, private menuCtrl: MenuController) { }

  ayunta: Ayuntamiento
  deportes = []

  ionViewDidEnter(): void {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.menuCtrl.enable(false)
    this.ayuntService.getAyuntamientoByName(this.ayuntService.nomAyunta).subscribe(res => {
      this.ayunta = res[0];
      this.ayuntService.ayunta = res[0];
      this.deportes = this.ayunta.instalaciones;
      console.log(this.deportes)
    })
  }

  informacion(){
    this.router.navigate(["/informacion"])
  }

  verHorario(deporte: string) {
    console.log(deporte)
    this.ayuntService.deporte = deporte
    this.router.navigate(["/horarios"])
  }

  llamar(n:string){
    console.log(n)
    this.callNumber.callNumber(n, true)
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer'));
}

}
