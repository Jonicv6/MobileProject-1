import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'listado-visitas', loadChildren: './pages/listado-visitas/listado-visitas.module#ListadoVisitasPageModule' },
  { path: 'comunicado-visitas', loadChildren: './pages/comunicado-visitas/comunicado-visitas.module#ComunicadoVisitasPageModule' },
  { path: 'documento-visita', loadChildren: './pages/documento-visita/documento-visita.module#DocumentoVisitaPageModule' },
  { path: 'validado-visitas', loadChildren: './pages/validado-visitas/validado-visitas.module#ValidadoVisitasPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
