import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallePage } from './detalle.page';

const routes: Routes = [
  {
    path: '',
    component: DetallePage
  },  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'modificar',
    loadChildren: () => import('./modificar/modificar.module').then( m => m.ModificarPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallePageRoutingModule {}
