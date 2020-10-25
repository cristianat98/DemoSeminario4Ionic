import { Component } from '@angular/core';
import { AlumnosService } from './alumnos.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  alumnos = [];
  constructor(private servicioalumnos: AlumnosService) {}

  ngOnInit(){
    this.alumnos = this.servicioalumnos.getalumnos();
  }

  ionViewWillEnter(){
    this.alumnos = this.servicioalumnos.getalumnos();
  }

}
