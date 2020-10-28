import { Course } from './course';

export class User {
    _id: string;
    nombre: string;
    apellidos: string;
    correo: string;
    edad: number;
    telefono: number;
    grado: string;
    courses: Course[];
    URL: string;

    constructor (nombre: string, apellidos: string, correo: string, edad: number, telefono: number, grado: string, courses: Course[], URL: string){
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.correo = correo;
        this.edad = edad,
        this.telefono = telefono;
        this.grado = grado;
        this.courses = courses;
        this.URL = URL;
    }
}
