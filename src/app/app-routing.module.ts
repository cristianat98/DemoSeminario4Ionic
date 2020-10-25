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
        loadChildren: () => import('./home/detalle/detalle.module').then(m => m.DetallePageModule)
      }]
  },
  {
    path: '',
    redirectTo: 'alumnos',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
