import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor(private alertCtrl: AlertController, private router: Router) { }

  async mensajeerror(){
    const alertElement = await this.alertCtrl.create({
      header: 'Parece que se ha desconectado del servidor',
      buttons: [
        {
          text: 'OK',
          handler:() => {
            this.router.navigate (['/alumnos'])
          }
        }
      ]
    });
    await alertElement.present();
  }
}
