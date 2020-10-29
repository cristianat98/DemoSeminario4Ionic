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
  //URLhttp: string = "http://10.0.2.2:3000"
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
    return this.http.post(this.URLhttp + "/course/add", asignatura, {headers});
  }

  modificaralumno(alumno: User): Observable<any>{

    const headers =  new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(this.URLhttp + "/user/update/" + alumno._id, alumno, {headers});
  }

  deletealumno(alumnoId: string): Observable<any>{
    return this.http.delete<any>(this.URLhttp + '/user/delete/' + alumnoId);
  }

  addasignatura(asignaturaId: string, alumno: User): Observable<any>{

    alumno.courses.push ({
      _id: asignaturaId,
      nombre: "",
      creditos: 0,
      nota: 0
    })

    const headers =  new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(this.URLhttp + "/user/update/" + alumno._id, alumno, {headers});
  }

  deleteasignatura(alumno: User, cursoId: string): Observable<any>{

    alumno.courses = alumno.courses.filter(course =>{
      return course._id !== cursoId
    });

    const headers =  new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put("http://localhost:3000/user/update/" + alumno._id, alumno, {headers});  
  }
}
