import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reservas } from '../clases funcionales/reservas.interface';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  private reservasCollection: AngularFirestoreCollection<Reservas>;
  private reservas: Observable<Reservas[]>;

  constructor(private db: AngularFirestore) {
    this.reservasCollection = this.db.collection<Reservas>('Reservas');
    this.reservas = this.reservasCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }
    ));
  }

  updateReserva(reserva: Reservas, id: string) {
    return this.reservasCollection.doc(id).update(reserva);
  }

  addReserva(reserva: Reservas) {
    return this.reservasCollection.add(reserva);
  }

  removeReserva(id: string) {
    return this.reservasCollection.doc(id).delete();
  }

  getReservas(tasks2: string, tasks3: string, tasks4: string) {
    return this.db.collection<Reservas>('Reservas', ref => ref.where('deporte', "==", tasks2).where('localizacion', "==", tasks3).where('dia', "==", tasks4)).valueChanges();
  }

  getReservasAyunta(tasks1: string, tasks2: string, tasks3: string) {
    return this.db.collection<Reservas>('Reservas', ref => ref.where('idAyuntamiento', "==", tasks1).where('deporte', "==", tasks2).where('dia', "==", tasks3)).valueChanges();
  }

  getReservasByEmail(tasks2: string) {
    return this.db.collection<Reservas>('Reservas', ref => ref.where('emailReservante', "==", tasks2)).valueChanges();
  }

}
