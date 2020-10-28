import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/modelos/user';
import { AlumnosService } from '../../alumnos.service';
import { MensajesService } from '../../mensajes.service';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.page.html',
  styleUrls: ['./modificar.page.scss'],
})
export class ModificarPage implements OnInit {

  alumno: User = new User("", "", "", 0, 0, "", [], "");
  constructor(private activatedroute: ActivatedRoute, private alumnoservicio: AlumnosService, private alertCtrl: AlertController, private router: Router,
    private mensajeserver: MensajesService) { }

  ngOnInit() {
    this.activatedroute.paramMap.subscribe(paramMap => {
      const recipeId = paramMap.get('alumnoId');
      this.alumnoservicio.getalumno(recipeId).subscribe(data =>{
        console.log(data);
        this.alumno = data
      }, error => {
        console.log(error);
        this.mensajeserver.mensajeerror();
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
      this.alumno.nombre = nombre.value;
      this.alumno.apellidos = apellidos.value;
      this.alumno.correo = correo.value;
      this.alumno.grado = grado.value;
      this.alumno.edad = edad.value;
      this.alumno.telefono = telefono.value;
      this.alumno.URL = foto.value;
      this.alumnoservicio.modificaralumno(this.alumno).subscribe(data => {
        console.log(data);
        this.router.navigate(['/alumnos/'+ this.alumno._id]);
      }, error => {
        console.log(error);
        this.mensajeserver.mensajeerror();
      });
      
    }
  }

}
