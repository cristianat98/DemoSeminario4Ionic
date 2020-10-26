import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AlumnosService } from '../../alumnos.service';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.page.html',
  styleUrls: ['./modificar.page.scss'],
})
export class ModificarPage implements OnInit {

  alumno;
  constructor(private activatedroute: ActivatedRoute, private alumnoservicio: AlumnosService, private alertCtrl: AlertController, private router: Router) { }

  ngOnInit() {
    this.activatedroute.paramMap.subscribe(paramMap => {
      const recipeId = paramMap.get('alumnoId');
      this.alumnoservicio.getalumno(recipeId);
      this.alumno = this.alumnoservicio.getalumno(recipeId);
  })
  }

  async guardaralumno(nombre, apellidos, correo, grado, edad, telefono){
    
    if (nombre.value == "" || apellidos.value == "" || correo.value == "" || grado.value == "" || edad.value == "" || telefono.value == ""){
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
        header: 'Alumno modificado',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.alumnoservicio.modificaralumno(this.alumno._id, nombre.value, apellidos.value, correo.value, grado.value, edad.value, telefono.value);
              this.router.navigate(['/alumnos/'+this.alumno._id]);
            }
          }
        ]
      });
      await alertElement.present();
    }
  }

}
