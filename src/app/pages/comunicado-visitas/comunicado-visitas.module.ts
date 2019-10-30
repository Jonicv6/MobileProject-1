import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ComunicadoVisitasPage } from './comunicado-visitas.page';

const routes: Routes = [
  {
    path: '',
    component: ComunicadoVisitasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ComunicadoVisitasPage]
})
export class ComunicadoVisitasPageModule {}
