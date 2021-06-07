import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Deportes } from '../clases funcionales/deportes.interface';

@Injectable({
  providedIn: 'root'
})
export class DeportesService {

  private deporteCollection: AngularFirestoreCollection<Deportes>;
  private deporte: Observable<Deportes[]>;

  constructor(private db: AngularFirestore) {
    this.deporteCollection = this.db.collection<Deportes>('Deportes');
    this.deporte = this.deporteCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }
    ));
  }

  getDeportes() {
    return this.deporte;
  }
}
