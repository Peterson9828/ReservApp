import { Component, ViewChildren, QueryList } from '@angular/core';

import { Platform, IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Router } from '@angular/router';
import { Location } from '@angular/common';


import { UsuarioService } from '../app/servicios/usuario.service'
import { AuthService } from '../app/servicios/auth.service'

import * as firebase from 'firebase/app';
import 'firebase/auth';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  backButtonSubscription;
  @ViewChildren(IonRouterOutlet) routerOutlets:QueryList<IonRouterOutlet>;

  public menuPages = [
    {
      title: 'Inicio',
      url: 'home',
      icon: 'home'
    },
    {
      title: 'Polideportivos',
      url: 'ayuntamientos',
      icon: 'football'
    },
    {
      title: 'Mis reservas',
      url: 'mis-reservas',
      icon: 'bookmarks'
    },
    {
      title: 'Contacto',
      url: 'contacto',
      icon: 'mail'
    },
  ];

  public log = [
    {
      title: 'Cerrar sesión',
      url: '',
      icon: 'power'
    },
  ];

  

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userService: UsuarioService,
    private authService: AuthService,
    private router: Router,
    private location: Location
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.platform.backButton.subscribeWithPriority(0, () => {
        if(this.router.url === "/home"){
          navigator["app"].exitApp();
        }else {
          this.location.back()
        }
        });
    });

    firebase.auth().onAuthStateChanged((user: firebase.User) => {
      if (user) {
        if(user.displayName){
          this.userService.nombre = user.displayName
        }else {
          this.userService.getUsuarioByEmail(user.email).subscribe(res => {
            this.userService.nombre = res[0].nombre
            this.userService.apellidos = res[0].apellidos
          })
        }
      }
    });
  }

  logOut() {
    this.authService.logOut()
  }
}
