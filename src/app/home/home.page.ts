import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { User } from '../modelos/user';
import { AlumnosService } from './alumnos.service';
import { MensajesService } from './mensajes.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  alumnos: User[];
  constructor(private servicioalumnos: AlumnosService, private router: Router, private alertCtrl: AlertController, private mensajeserver: MensajesService) {}

  ngOnInit(){
  }

  ionViewWillEnter(){
    this.alumnos = [];
    this.servicioalumnos.getalumnos().subscribe(data => {
      console.log(data);
      this.alumnos = data}, 
      error =>{
        console.log(error);
        this.mensajeserver.mensajeerror();
      }
    );
  }

  registraralumno(){
    this.router.navigate(['/alumnos/registrar']);
  }

  registrarasignatura(){
    this.router.navigate(['/alumnos/addasignatura']);
  }
}
