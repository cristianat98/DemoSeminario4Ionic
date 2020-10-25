import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { AlumnosService } from '../alumnos.service';
import { AlertController } from '@ionic/angular'; 

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  alumno;
  constructor(private activatedroute: ActivatedRoute, private alumnoservicio: AlumnosService, private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.activatedroute.paramMap.subscribe(paramMap => {
      //redirect
      const recipeId = paramMap.get('alumnoId');
      this.alumnoservicio.getalumno(recipeId);
      this.alumno = this.alumnoservicio.getalumno(recipeId);
  })
  
  } 

  async deleteAlumno(){
    const alertElement = await this.alertCtrl.create({
      header: "¿Estás segura que quieres que " + this.alumno.nombre + " " + this.alumno.apellidos + " no sea tu alumno?",
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Sí',
          handler: () => {
            this.alumnoservicio.deletealumno(this.alumno.id);
            this.router.navigate(['/alumnos']);
          }
        }
      ]
    });
    await alertElement.present();
  }

  NotaAleatiora(){
    return Math.random() * 10;
  }

  eliminarAsignatura(asignatura: string){
    this.alumnoservicio.deleteasignatura(asignatura, this.alumno.id)
  }
  
}
