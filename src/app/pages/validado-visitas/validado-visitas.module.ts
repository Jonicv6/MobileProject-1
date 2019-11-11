import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ValidadoVisitasPage } from './validado-visitas.page';

const routes: Routes = [
  {
    path: '',
    component: ValidadoVisitasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ValidadoVisitasPage]
})
export class ValidadoVisitasPageModule {}
