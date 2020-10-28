import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Course } from 'src/app/modelos/course';
import { AlumnosService } from '../alumnos.service';

@Component({
  selector: 'app-addasignatura',
  templateUrl: './addasignatura.page.html',
  styleUrls: ['./addasignatura.page.scss'],
})
export class AddasignaturaPage implements OnInit {

  course: Course;
  constructor(private alertCtrl: AlertController, private servicioalumnos: AlumnosService, private router: Router) { }

  ngOnInit() {
  }

  async mensajeservidor (mensaje: string){

    const alertElement = await this.alertCtrl.create({
      header: mensaje,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/alumnos']);
          }
        }
      ]
    });
    await alertElement.present();
  }

  async registrarasignatura(nombre, creditos){
    if (nombre.value == "" || creditos.value == ""){
      const alertElement = await this.alertCtrl.create({
        header: 'Debe rellenar todos los campos',
        buttons: [
          {
            text: 'OK',
            role: 'cancel'
          }
        ]
      });
      await alertElement.present();
    }

    else{
      this.course = new Course(nombre.value, creditos.value);
      this.servicioalumnos.registrarasignatura(this.course).subscribe(data => {
        console.log(data);
        this.mensajeservidor("Asignatura Añadida Correctamente");
      }, error => {
        console.log(error);
        this.mensajeservidor("Parece que te has desconectado del Servidor");
      })
    }
  }
}
