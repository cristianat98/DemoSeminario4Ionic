import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { AlumnosService } from '../alumnos.service';
import { AlertController } from '@ionic/angular'; 
import { User } from 'src/app/modelos/user';
import { Course} from 'src/app/modelos/course'
import { MensajesService } from '../mensajes.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  alumno: User = new User ("", "", "", 0, 0, "", [], "",);
  cursossincursar: Course[];
  i: number;
  aleatorio: number;
  resto: number;
  constructor(private activatedroute: ActivatedRoute, private alumnoservicio: AlumnosService, private router: Router, private alertCtrl: AlertController,
    private mensajeserver: MensajesService) { }

  ngOnInit() {
  } 

  ionViewWillEnter(){
    this.activatedroute.paramMap.subscribe(paramMap => {
      const recipeId = paramMap.get('alumnoId');
      this.alumnoservicio.getalumno(recipeId).subscribe(data =>{
        console.log(data);
        this.alumno = data;
        this.alumnoservicio.getcourses().subscribe(data => {
          console.log(data);
          this.cursossincursar = data;
          this.i = 0;
          while (this.i<this.alumno.courses.length){
            this.cursossincursar = this.cursossincursar.filter(course => {
              return course._id !== this.alumno.courses[this.i]._id})
            this.alumno.courses[this.i].nota = this.getNota();  
            this.i++;
          }
        });
      }, error => {
        console.log(error);
        this.mensajeserver.mensajeerror();
      });
    });
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
            this.alumnoservicio.deletealumno(this.alumno._id).subscribe(data => {
              console.log(data);
              this.router.navigate(['/alumnos']);
            }, error => {
              console.log(error);
              this.mensajeserver.mensajeerror();
            });
          }
        } 
      ]
    });
    await alertElement.present();
  }

  getNota(): number{ 
    console.log("Número aleatorio")
    this.aleatorio = Math.random()*10;
    this.resto = this.aleatorio%1;
    this.aleatorio = this.aleatorio-this.resto;
    return Math.round(Math.random()*10);
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
            this.alumnoservicio.deleteasignatura(this.alumno, asignatura._id).subscribe(data =>{
              console.log(data);
              this.ionViewWillEnter();
            }, error => {
              console.log(error);
              this.mensajeserver.mensajeerror();
            })
          }
        }
      ]
    });
    await alertElement.present();
  }

  async addasignatura(asignatura){
    if (asignatura.value != undefined){
      this.alumnoservicio.addasignatura(asignatura.value, this.alumno).subscribe(data => {
        console.log(data);
        this.ionViewWillEnter();
      }, error => {
        console.log(error);
        this.mensajeserver.mensajeerror();
      });
    }
  }
}
