import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases funcionales/usuario.interface';

import { AuthService } from '../../servicios/auth.service'
import { UsuarioService } from '../../servicios/usuario.service'

import { Router } from "@angular/router"
import { MenuController, ToastController } from '@ionic/angular'


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private usuario: Usuario = {
    password: "",
    email: ""
  }


  constructor(private authService: AuthService, private router: Router, private menuCtrl: MenuController, private toastCtrl: ToastController, private userService: UsuarioService) {  }

  ngOnInit() {
  }

  login(){
    this.userService.flag = true;
    this.authService.login(this.usuario.email, this.usuario.password);
  }


  loginGoogle() {
    this.authService.loginWithGoogle().then(res => {
    this.userService.flag = false;
    this.router.navigate(['/home'])
    }).catch(err => { this.popErrorLogin()
    })
  }


  // loginFacebook() {
  //   this.authService.loginWithFacebook().then(res => {
  //   this.userService.flag = false;
  //     this.router.navigate(['/home'])
  //   }).catch(err => { this.popErrorLogin()
  //   })
  // }
  

  goToRegister(){
    this.router.navigate(["/register"])
  }

  async popErrorLogin() {
    const toast = await this.toastCtrl.create({
      message: 'Error al iniciar sesión',
      animated: true,
      color: "primary",
      duration: 1000,
    });
    toast.present();
  }

}
