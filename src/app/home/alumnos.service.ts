import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import{User} from '../modelos/user'
import { Course } from '../modelos/course';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  
  URLhttp: string = "http://localhost:3000"
  constructor(private http: HttpClient) { }
  
  getalumnos(): Observable<User[]>{
    return this.http.get<any>(this.URLhttp + "/user");
  }

  getalumno(alumnoId: string): Observable<User> {
    return this.http.get<any>(this.URLhttp + "/user/" + alumnoId);
  }

  getcourses(): Observable<Course[]>{
    return this.http.get<any>(this.URLhttp + "/course");
  }

  registraralumno(alumno: User): Observable<any>{

    const headers =  new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.URLhttp + "/user/register", alumno, {headers});
  }

  registrarasignatura(asignatura: Course): Observable<any>{

    const headers =  new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post("http://localhost:3000/course/add", asignatura, {headers});
  }

  modificaralumno(alumno: User): Observable<any>{

    const headers =  new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put("http://localhost:3000/user/update/" + alumno._id, alumno, {headers});
  }

  deletealumno(alumnoId: string): Observable<any>{
    return this.http.delete<any>('http://localhost:3000/user/delete/' + alumnoId);
  }

  /*addasignatura(asignaturaId: string, alumno: User): Observable<any>{

    const headers =  new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put("http://localhost:3000/user/update/" + alumnoId, asignatura, {headers});
  }*/

  deleteasignatura(alumno: User, cursoId: string){

    alumno.courses.filter(course =>{
      return course._id !== cursoId
    });

    const headers =  new HttpHeaders().set('Content-Type', 'application/json');
    this.http.put("http://localhost:3000/user/update/" + alumno._id, alumno, {headers}).subscribe();  
  }
}
