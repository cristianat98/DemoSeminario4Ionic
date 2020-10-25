import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AlumnosService } from '../alumnos.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  courses = [];
  constructor(private servicioalumnos: AlumnosService, private alertCtrl: AlertController, private router: Router) { }

  ngOnInit() {
    this.courses = this.servicioalumnos.getcourses();
  }

  async guardaralumno(nombre, apellidos, correo, edad, telefono){
    
    if (nombre.value == "" || apellidos.value == "" || correo.value == "" || edad.value == "" || telefono.value == ""){
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
      const alertElement = await this.alertCtrl.create({
        header: 'Alumno registrado',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              //this.servicioalumnos.registraralumno(nombre.value, apellidos.value, correo.value, edad.value, telefono.value);
              this.router.navigate(['/alumnos']);
            }
          }
        ]
      });
      await alertElement.present();
    }
  }
}
