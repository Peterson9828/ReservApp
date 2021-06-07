import { Injectable } from '@angular/core';
import { Busqueda } from 'src/app/clases funcionales/busqueda.interface';

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

  constructor() { }

  busqueda: Busqueda = {
    lugar: "",
    deporte: "",
    dia: "",
  }

}
