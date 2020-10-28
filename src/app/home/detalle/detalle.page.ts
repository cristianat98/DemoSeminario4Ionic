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
  cursossincursar = [];
  i: number;
  aleatorio: number;
  resto: number;
  constructor(private activatedroute: ActivatedRoute, private alumnoservicio: AlumnosService, private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.activatedroute.paramMap.subscribe(paramMap => {
      const recipeId = paramMap.get('alumnoId');
      this.alumnoservicio.getalumno(recipeId);
      this.alumno = this.alumnoservicio.getalumno(recipeId);
  })

  this.cursossincursar = this.alumnoservicio.getcourses();
  } 

  ionViewWillEnter(){
    this.cursossincursar = this.alumnoservicio.getcourses();

    this.i = 0;
    while (this.i<this.alumno.courses.length){
      this.alumno.courses[this.i].nota = this.NotaAleatiora();
      this.i++;
    }

    /*this.cursossincursar = this.cursossincursar.filter(course => {
      return course._id !== this.alumno.courses[0]._id})
      console.log("El curso de cursossincursar es: " + this.alumno.courses[0]._id);
    console.log("Los cursos sin cursar son: "+ JSON.stringify(this.cursossincursar));*/
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
            this.alumnoservicio.deletealumno(this.alumno._id);
            this.router.navigate(['/alumnos']);
          }
        }
      ]
    });
    await alertElement.present();
  }

  NotaAleatiora(){
    
    this.aleatorio = Math.random() * 10;
    this.resto = this.aleatorio%1;
    this.aleatorio = this.aleatorio-this.resto;
    return this.aleatorio;
  }

  AbrirModificar(){
    this.router.navigate(['/alumnos/' + this.alumno._id + "/modificar"]);
  }

  AbrirChat(){
    this.router.navigate(['/alumnos/' + this.alumno._id + "/chat"]);
  }
  
  async eliminarAsignatura(asignatura){
    const alertElement = await this.alertCtrl.create({
      header: "¿Estás segura que " + this.alumno.nombre + " " + this.alumno.apellidos + " ya no está cursando " + asignatura.nombre + "?",
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Sí',
          handler: () => {
            this.alumnoservicio.deleteasignatura(this.alumno._id, asignatura._id)
            this.router.navigate(['/alumnos']);
          }
        }
      ]
    });
    await alertElement.present();
  }

  async addasignatura(asignatura){
    console.log("La asignatura es: " + asignatura.value);
    const alertElement = await this.alertCtrl.create({
      header: 'La asignatura ' + this.alumnoservicio.getcourse(asignatura.value) + " se ha añadido al alumno " + this.alumno.nombre + " " + this.alumno.apellidos,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.alumnoservicio.addasignatura(this.alumno._id, asignatura.value);
            this.router.navigate(['/alumnos']);
          }
        }
      ]
    });
    await alertElement.present();
  }
}
