export class Course {
    _id: string;
    nombre: string;
    creditos: number;

    constructor (nombre: string, creditos: number){
        this.nombre = nombre;
        this.creditos = creditos;
    }
}
