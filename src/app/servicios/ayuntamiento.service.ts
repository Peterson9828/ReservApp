import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ayuntamiento } from '../clases funcionales/ayuntamiento.interfaz';

@Injectable({
  providedIn: 'root'
})
export class AyuntamientoService {

  nomAyunta

  localidad
  deporte
  ayunta
  dia
  
  private ayuntamientoCollection: AngularFirestoreCollection<Ayuntamiento>;
  private ayuntamiento: Observable<Ayuntamiento[]>;

  constructor(private db: AngularFirestore) {
    this.ayuntamientoCollection = this.db.collection<Ayuntamiento>('Ayuntamiento');
    this.ayuntamiento = this.ayuntamientoCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }
    ));
  }

  getAyuntamientos() {
    return this.ayuntamiento;
  }

  getAyuntamiento(id: string) {
    return this.ayuntamientoCollection.doc<Ayuntamiento>(id).valueChanges();
  }

  updateAyuntamiento(ayuntamiento: Ayuntamiento, id: string) {
    return this.ayuntamientoCollection.doc(id).update(ayuntamiento);
  }

  addAyuntamiento(ayuntamiento: Ayuntamiento) {
    return this.ayuntamientoCollection.add(ayuntamiento);
  }

  removeAyuntamiento(id: string) {
    return this.ayuntamientoCollection.doc(id).delete();
  }

  getAyuntamientoByName(tasks: string) {
    return this.db.collection<Ayuntamiento>('Ayuntamiento', ref => ref.where('nombre', '==', tasks)).valueChanges();
  }

  getAyuntamientoL(tasks: string) {
    return this.db.collection<Ayuntamiento>('Ayuntamiento', ref => ref.where('localidad', '==', tasks)).valueChanges();
  }

  getAyuntamientoLD(tasks: string, tasks2: string) {
    return this.db.collection<Ayuntamiento>('Ayuntamiento', ref => ref.where('localidad', '==', tasks).where('instalaciones', "array-contains", tasks2)).valueChanges();
  }

  getAyuntamientoLDD(tasks: string, tasks2: string, tasks3: string) {
    return this.db.collection<Ayuntamiento>('Ayuntamiento', ref => ref.where('localidad', '==', tasks).where('instalaciones', "array-contains", tasks2).where('horario', "array-contains", tasks3)).valueChanges();
  }

}
