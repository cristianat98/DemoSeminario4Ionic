import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AlumnosService } from '../alumnos.service';
import { Course} from '../../modelos/course'
import { User } from 'src/app/modelos/user';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  alumno: User;
  constructor(private servicioalumnos: AlumnosService, private alertCtrl: AlertController, private router: Router) { }

  ngOnInit() {
  }

  async mensajeservidor(mensaje: string){

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

  async guardaralumno(nombre, apellidos, correo, grado, edad, telefono, foto){
    
    if (nombre.value == "" || apellidos.value == "" || correo.value == "" || grado.value == "" || edad.value == "" || telefono.value == "" || foto.value == ""){
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
      this.alumno = new User(nombre.value, apellidos.value, correo.value, edad.value, telefono.value, grado.value, [], foto.value);
      this.servicioalumnos.registraralumno(this.alumno).subscribe(data => {
        console.log(data);
        this.mensajeservidor("Alumno Registrado Correctamente.");
      }, error => {
        console.log(error);
        this.mensajeservidor("Parece que te has desconectado del servidor");
      });
    }
  }
}
