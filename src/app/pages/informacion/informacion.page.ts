import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core'

import { AyuntamientoService } from '../../servicios/ayuntamiento.service'
import { Ayuntamiento } from '../../clases funcionales/ayuntamiento.interfaz'

import { LoadingController, MenuController } from '@ionic/angular'

import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var google: any;

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
})
export class InformacionPage implements OnInit {

  lat: number
  lng: number
  latRes: number
  lngRes: number
  myLat: number
  myLng: number
  mapRef = null;

  ayunta: Ayuntamiento
  servicios = []
  instalaciones = []

  constructor(private ayuntService: AyuntamientoService, private menuCtrl: MenuController, private loadCtrl: LoadingController, private geolocation: Geolocation) { }

  ionViewDidEnter(): void {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.ayunta = this.ayuntService.ayunta
    this.loadMap()
  }

  async loadMap() {

    const loading = await this.loadCtrl.create({
      message: 'Cargando...'
    });
    loading.present();

    this.latRes = this.ayunta.latitud
    this.lngRes = this.ayunta.longitud

    const respos = { lat: +this.latRes, lng: +this.lngRes }
    this.mapRef = new google.maps.Map(document.getElementById('map'), {
      center: respos,
      zoom: 16,
      styles: [
        {
          "featureType": "poi",
          "elementType": "labels.text",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi.business",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        }
      ]
    });

    google.maps.event.addListenerOnce(this.mapRef, 'idle', () => {
      loading.dismiss();
      this.addMarker(+this.ayunta.latitud, +this.ayunta.longitud)
      // document.getElementById("hola").addEventListener('click', () => {
      //   console.log('sjflajdsflds')
      //   window.open('https://www.google.com/maps/dir?api=1&destination=' + this.ayuntService.ayunta.latitud + ',' + this.ayuntService.ayunta.longitud)
      // })
    })
  }

  /*private async getPosition() {
    let myPos = this.geolocation.getCurrentPosition()
    this.myLat = (await myPos).coords.latitude
    this.myLng = (await myPos).coords.longitude
  }*/

  private addMarker(lat: number, lng: number) {
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: this.mapRef,
    });
  }

  comoLlegar() {
    console.log(this.ayunta.latitud)
    console.log(this.ayunta.longitud)
    window.open('https://www.google.com/maps/dir/?api=1&destination=' + this.ayunta.latitud + ',' + this.ayunta.longitud)
  }

}
