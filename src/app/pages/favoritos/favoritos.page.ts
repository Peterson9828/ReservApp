import { Component, OnInit } from '@angular/core';

import { MenuController } from '@ionic/angular'

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {

  constructor(private menuCtrl: MenuController) { }

  ionViewDidEnter(): void {
    this.menuCtrl.enable(true);
  }

  // ionViewDidLeave(): void {
  //   this.menuCtrl.enable(false);
  // }

  ngOnInit() {
  }

}
