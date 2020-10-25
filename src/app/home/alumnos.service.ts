import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  
  alumnos = [];
  courses = [];
  constructor(private http: HttpClient) { }
  
  getalumnos(){
    this.http.get<any>('http://localhost:3000/user').subscribe(data => {
      this.alumnos = data;
    });
    return this.alumnos;
  }

  getalumno(alumnoId: string) {
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

  registraralumno(nombre, apellidos, correo, edad, telefono){

  }

  deletealumno(alumnoId: string){
    console.log(alumnoId);
    this.http.delete<any>('http://localhost:3000/user/delete/' + alumnoId).subscribe();
  }
}
