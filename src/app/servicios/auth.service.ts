import { Injectable } from '@angular/core';

import { AngularFireAuth } from "@angular/fire/auth"
import { auth } from 'firebase'

// import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx'

import { UsuarioService } from '../servicios/usuario.service'

import { Router } from "@angular/router"

import { MenuController, ToastController } from '@ionic/angular'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AFauth: AngularFireAuth, private router: Router,private google: GooglePlus, private toastCtrl: ToastController, private userService: UsuarioService, private menuCtrl: MenuController) { }

  login(email: string, password: string) {
    return new Promise((resolve, rejected) => {
      this.AFauth.signInWithEmailAndPassword(email, password).then(res => {
        resolve(res)
        this.userService.email = res.user.email
        this.router.navigate(["/home"])
      }).catch(err => this.popErrorLogin())
    })
  }

  loginWithGoogle() {
    return this.google.login({}).then(res => {
      const user_data_google = res;
      this.userService.flag = false;
      return this.AFauth.signInWithCredential(auth.GoogleAuthProvider.credential(null, user_data_google.accessToken));
    })

    //return this.AFauth.signInWithPopup(new auth.GoogleAuthProvider)         //poder logear en pc
  }

  // loginWithFacebook() {
  //   return this.fb.login(['email', 'public_profile']).then((res: FacebookLoginResponse) => {
  //     const credential_fb = auth.FacebookAuthProvider.credential(res.authResponse.accessToken)
  //     this.userService.flag = false;
  //     return this.AFauth.signInWithCredential(credential_fb)
  //   })
  //   //return this.AFauth.signInWithPopup(new auth.FacebookAuthProvider)         //poder logear en pc
  // }

  register(email: string, password: string) {
    return new Promise((resolve, rejected) => {
      this.AFauth.createUserWithEmailAndPassword(email, password).then(res => {
        resolve(res)
        this.userService.email = res.user.email
        this.router.navigate(["/home"])
      }).catch(err => this.popErrorRegister())
    })
  }

  logOut(){
    this.AFauth.signOut().then(() => {
      this.userService.nombre = ""
      this.userService.apellidos = ""
      this.userService.flag = false;
      //this.menuCtrl.enable(false)
      this.google.disconnect();
      // this.fb.logout();
      this.router.navigate(['/login'])
    })
  }

  getUserAuth(){
    return this.AFauth.authState
  }

  async popErrorLogin() {
    const toast = await this.toastCtrl.create({
      message: 'Email o contraseña incorrectos',
      animated: true,
      color: "primary",
      duration: 1000,
    });
    toast.present();
  }

  async popErrorRegister() {
    const toast = await this.toastCtrl.create({
      message: 'Error al registrarse',
      animated: true,
      color: "primary",
      duration: 1000,
    });
    toast.present();
  }
}
