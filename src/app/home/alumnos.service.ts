import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  
  private alumnos = [
    {
      id: '1',
      telefono: 682547107,
      nombre: "Cristian",
      apellidos: "Armesto Tejedo",
      courses: ["11", "12"]
    },
    {
      id: '2',
      telefono: 645874102,
      nombre: "Ivan",
      apellidos: "Requena Garcia",
      courses: []
    },
    {
      id: '3',
      telefono: 621478963,
      nombre: "Miquel Puspa",
      apellidos: "Torres Campo",
      courses: []
    }
  ]

  private courses = [
    {
      id: '10',
      nombre: 'SX',
      creditos: '4'
    },
    {
      id: '11',
      nombre: 'EA',
      creditos: '12'
    },
    {
      id: '12',
      nombre: 'PX',
      creditos: '4'
    }
  ]
  constructor(private http: HttpClient) { }
  
  getalumnos(){
    return[...this.alumnos]
  }

  getalumno(alumnoId: string) {
    return {
      ...this.alumnos.find(alumno => {
        return alumno.id === alumnoId
    })
    } 
  }

  getcourse(courseId: string){
    return {
      ...this.courses.find(course => {
        return course.id === courseId
      })
    }
  }

  deletealumno(alumnoId: string){
    this.alumnos = this.alumnos.filter(alumno => {
      return alumno.id !== alumnoId
    })
  }

  deleteasignatura(alumnoId: string, courseId: string){
  }
}
