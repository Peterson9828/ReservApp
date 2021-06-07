import { Ayuntamiento } from './ayuntamiento.interfaz';

export interface Usuario {
    id?: string;
    nombre?: string;
    apellidos?: string;
    email?: string;
    password?: string;
    favoritos?: Ayuntamiento[];
}