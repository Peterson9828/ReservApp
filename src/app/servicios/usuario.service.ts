import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from '../clases funcionales/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  nombre
  apellidos
  email

  flag: boolean

  private usuarioCollection: AngularFirestoreCollection<Usuario>;
  private usuario: Observable<Usuario[]>;

  constructor(private db: AngularFirestore) {
    this.usuarioCollection = this.db.collection<Usuario>('Usuario');
    this.usuario = this.usuarioCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }
    ));
  }

  getUsuarios() {
    return this.usuario;
  }

  getUsuario(id: string) {
    return this.usuarioCollection.doc<Usuario>(id).valueChanges();
  }

  updateUsuario(usuario: Usuario, id: string) {
    return this.usuarioCollection.doc(id).update(usuario);
  }

  addUsuario(usuario: Usuario) {
    return this.usuarioCollection.add(usuario);
  }

  removeUsuario(id: string) {
    return this.usuarioCollection.doc(id).delete();
  }

  getUsuarioByName(tasks: string) {
    this.db.collection<Usuario>('Usuario');
    return this.db.collection<Usuario>('Usuario', ref => ref.where('nombre', '==', tasks)).valueChanges();
  }

  getUsuarioByEmail(tasks: string) {
    this.db.collection<Usuario>('Usuario');
    return this.db.collection<Usuario>('Usuario', ref => ref.where('email', '==', tasks)).valueChanges();
  }
}
