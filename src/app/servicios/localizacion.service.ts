import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Localizacion } from '../clases funcionales/localizacion.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalizacionService {

  private localizacionCollection: AngularFirestoreCollection<Localizacion>;
  private localizacion: Observable<Localizacion[]>;

  constructor(private db: AngularFirestore) {
    this.localizacionCollection = this.db.collection<Localizacion>('Localizacion');
    this.localizacion = this.localizacionCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }
    ));
  }

  getCiudades() {
    return this.localizacion;
  }
  
}
