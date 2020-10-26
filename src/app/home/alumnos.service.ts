import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

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

  registraralumno(nombrer, apellidosr, correor, grador, edadr, telefonor){
    const datos = {
      "courses": [],
      "nombre": nombrer,
      "apellidos": apellidosr,
      "correo": correor,
      "grado": grador,
      "edad": edadr,
      "telefono": telefonor
    }

    console.log("Nuevo Usuario: " + JSON.stringify(datos));
    //this.http.post("http://localhost:3000/user/register", JSON.stringify(datos)).toPromise();
  }

  modificaralumno(alumnodId, nombrea, apellidosa, correoa, gradoa, edada, telefonoa){

    this.alumno = this.getalumno(alumnodId);

    const datos = {
      "courses": this.alumno.courses,
      "nombre": nombrea,
      "apellidos": apellidosa,
      "correo": correoa,
      "grado": gradoa,
      "edad": edada,
      "telefono": telefonoa
    }
    console.log("Los nuevos datos del usuario: " + this.alumno._id + " son: " + JSON.stringify(datos));
    //this.http.put("http://localhost:3000/user/update/" + this.alumno._id, JSON.stringify(datos)).toPromise();
  }

  deletealumno(alumnoId: string){
    this.http.delete<any>('http://localhost:3000/user/delete/' + alumnoId).subscribe();
  }

  addasignatura(alumnoId, cursoId){

    this.alumno = this.getalumno(alumnoId);
    ;

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
    //this.http.put("http://localhost:3000/user/update/" + this.alumno._id, JSON.stringify(datos)).toPromise();
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

      console.log("Los nuevos datos del usuario: " + this.alumno._id + " son: " + JSON.stringify(datos));
      //this.http.put("http://localhost:3000/user/update/" + this.alumno._id, JSON.stringify(datos)).toPromise();  
  }
}
