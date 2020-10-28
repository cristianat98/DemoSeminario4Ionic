import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  
  alumno;
  alumnos = [];
  courses = [];
  constructor(private http: HttpClient) { }
  
  getalumnos(){
    this.http.get<any>('http://localhost:3000/user').subscribe(data => {
      this.alumnos = data;
    });
    return this.alumnos;
  }

  getalumno(alumnoId) {
    return {
      ...this.alumnos.find(alumno => {
        return alumno._id === alumnoId
    })
    } 
  }

  getcourses(){
    this.http.get<any>('http://localhost:3000/course').subscribe(data => {
      this.courses = data;
    });
    return this.courses;
  }

  getcourse(cursoId){
    return{
      ...this.courses.find(course => {
        return course._id === cursoId
      })
    }
  }

  registraralumno(nombrer, apellidosr, correor, grador, edadr, telefonor,fotor){
    const datos = {
      "courses": [],
      "nombre": nombrer,
      "apellidos": apellidosr,
      "correo": correor,
      "grado": grador,
      "edad": edadr,
      "telefono": telefonor,
      "URL": fotor
    }

    const headers =  new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post("http://localhost:3000/user/register", JSON.stringify(datos), {headers}).subscribe();
  }

  modificaralumno(alumnodId, nombrea, apellidosa, correoa, gradoa, edada, telefonoa, fotoa){

    this.alumno = this.getalumno(alumnodId);
    const datos = {
      "courses": this.alumno.courses,
      "nombre": nombrea,
      "apellidos": apellidosa,
      "correo": correoa,
      "grado": gradoa,
      "edad": edada,
      "telefono": telefonoa,
      "URL": fotoa
    }

    console.log("El usuario que se envía es: " + JSON.stringify(datos));
    const headers =  new HttpHeaders().set('Content-Type', 'application/json');
    this.http.put("http://localhost:3000/user/update/" + this.alumno._id, JSON.stringify(datos), {headers}).subscribe();
  }

  deletealumno(alumnoId: string){
    this.http.delete<any>('http://localhost:3000/user/delete/' + alumnoId).subscribe();
  }

  addasignatura(alumnoId, cursoId){

    this.alumno = this.getalumno(alumnoId);
    this.alumno.courses.push({
      _id: cursoId});

    const datos = {
      "courses": this.alumno.courses,
      "nombre": this.alumno.nombre,
      "apellidos": this.alumno.apellidos,
      "correo": this.alumno.correo,
      "grado": this.alumno.grado,
      "edad": this.alumno.edad,
      "telefono": this.alumno.telefono
    }

    console.log("Los nuevos datos del usuario: " + this.alumno._id + " son: " + JSON.stringify(datos));
    const headers =  new HttpHeaders().set('Content-Type', 'application/json');
    this.http.put("http://localhost:3000/user/update/" + this.alumno._id, JSON.stringify(datos), {headers}).subscribe();
  }

  deleteasignatura(alumnoId, cursoId){
    this.alumno = this.getalumno(alumnoId);

      const datos = {
        "courses": this.alumno.courses.filter(course => {
          return course._id !== cursoId}),
        "nombre": this.alumno.nombre,
        "apellidos": this.alumno.apellidos,
        "correo": this.alumno.correo,
        "grado": this.alumno.grado,
        "edad": this.alumno.edad,
        "telefono": this.alumno.telefono
      }

      const headers =  new HttpHeaders().set('Content-Type', 'application/json');
      this.http.put("http://localhost:3000/user/update/" + this.alumno._id, JSON.stringify(datos), {headers}).subscribe();  
  }
}
