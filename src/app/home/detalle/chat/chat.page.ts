import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { AlumnosService } from '../../alumnos.service';
import { Socket } from 'ngx-socket-io';
import { ToastController } from '@ionic/angular';
import { User } from 'src/app/modelos/user';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  alumno: User = new User("", "", "", 0, 0, "", [], "");
  message = '';
  messages= []; 
  currentUser = '';


  constructor(private socket: Socket, private toastCtrl: ToastController, private activatedroute: ActivatedRoute, private alumnoservicio: AlumnosService,private router: Router) { }

  ngOnInit() {

    this.socket.connect();

    this.activatedroute.paramMap.subscribe(paramMap => {
      //redirect
      const recipeId = paramMap.get('alumnoId');
      this.alumnoservicio.getalumno(recipeId).subscribe(data => {
        console.log(data);
        this.alumno = data;

        let name = this.alumno.nombre;

        this.currentUser = name;
        this.socket.emit('set-name', name)

        this.socket.fromEvent('users-changed').subscribe(data => {
          let user = data['user'];
          if (data['event'] === 'left') {
            this.showToast('User left: ' + user);
          } else {
            this.showToast('User joined: ' + user);
          }
        });
      
        this.socket.fromEvent('message').subscribe(message => {
          this.messages.push(message);
        });
      });
  })
  
}

sendMessage() {
  this.socket.emit('send-message', { text: this.message });
  this.message = '';
}
ionViewWillLeave() {
  this.socket.disconnect();
}

async showToast(msg) {
  let toast = await this.toastCtrl.create({
    message: msg,
    position: 'top',
    duration: 2000
  });
  toast.present();
}

}
