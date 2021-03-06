import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'alumnos',
    children:[
      {
        path: "",
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      },
      {
        path: ":alumnoId",
        children:[
          {
            path: "",
            loadChildren: () => import('./home/detalle/detalle.module').then(m => m.DetallePageModule)
          }, 
          {
            path: "chat",
            loadChildren: () => import('./home/detalle/chat/chat.module').then(m => m.ChatPageModule)
          },
          {
            path: "modificar",
            loadChildren: () => import('./home/detalle/modificar/modificar.module').then(m => m.ModificarPageModule)
          }
        ]
      },
      {
        path: "registrar",
        loadChildren: () => import('./home/registrar/registrar.module').then(m => m.RegistrarPageModule)
      },
      {
        path: "addasignatura",
        loadChildren: () => import('./home/addasignatura/addasignatura.module').then (m => m.AddasignaturaPageModule) 
      }]
    
  },
  {
    path: '',
    redirectTo: 'alumnos',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
