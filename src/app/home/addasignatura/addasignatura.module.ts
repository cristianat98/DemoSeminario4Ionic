import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddasignaturaPageRoutingModule } from './addasignatura-routing.module';

import { AddasignaturaPage } from './addasignatura.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddasignaturaPageRoutingModule
  ],
  declarations: [AddasignaturaPage]
})
export class AddasignaturaPageModule {}
