import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/modelos/user';
import { AlumnosService } from '../../alumnos.service';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.page.html',
  styleUrls: ['./modificar.page.scss'],
})
export class ModificarPage implements OnInit {

  alumno: User;
  constructor(private activatedroute: ActivatedRoute, private alumnoservicio: AlumnosService, private alertCtrl: AlertController, private router: Router) { }

  ngOnInit() {
    this.activatedroute.paramMap.subscribe(paramMap => {
      const recipeId = paramMap.get('alumnoId');
      this.alumnoservicio.getalumno(recipeId).subscribe(data =>{
        this.alumno = data
      });
  })
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
      const alertElement = await this.alertCtrl.create({
        header: 'Alumno modificado',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.alumnoservicio.modificaralumno(this.alumno);
              this.router.navigate(['/alumnos/'+this.alumno._id]);
            }
          }
        ]
      });
      await alertElement.present();
    }
  }

}
