import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlumnosService } from './alumnos.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  alumnos = [];
  constructor(private servicioalumnos: AlumnosService, private router: Router) {}

  ngOnInit(){
    this.alumnos = this.servicioalumnos.getalumnos();
  }

  ionViewWillEnter(){
    this.alumnos = this.servicioalumnos.getalumnos();
  }

  registraralumno(){
    this.router.navigate(['/alumnos/registrar']);
  }

  registrarasignatura(){
    this.router.navigate(['/alumnos/addasignatura']);
  }
}
