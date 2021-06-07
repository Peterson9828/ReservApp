import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../servicios/auth.service'
import { UsuarioService } from '../../servicios/usuario.service'

import {Usuario} from '../../clases funcionales/usuario.interface'

import { MenuController } from '@ionic/angular'

import { Router } from "@angular/router"


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  private usuario: Usuario = {
    nombre: "",
    apellidos: "",
    email: "",
    password: ""
  }

  constructor(private authService: AuthService, private userService: UsuarioService, private menuCtrl: MenuController, private router: Router) { 
  }

  ionViewDidEnter(): void {
    this.menuCtrl.enable(false);
  }

  // ionViewDidLeave(): void {
  //   this.menuCtrl.enable(true);
  // }

  ngOnInit() {
    //this.menuCtrl.enable(false)
  }

  Register(){
    this.authService.register(this.usuario.email, this.usuario.password).then(res => {
      this.userService.flag = true;
      //this.menuCtrl.enable(true)
      this.userService.addUsuario(this.usuario)
    })
  }

  goToLogin(){
    this.router.navigate(["/login"])
  }

}
