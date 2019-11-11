import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-validado-visitas',
  templateUrl: './validado-visitas.page.html',
  styleUrls: ['./validado-visitas.page.scss'],
})
export class ValidadoVisitasPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  validation(ionicButton, ionicIcon) {
    ionicButton.color = "success";
    ionicIcon.color = "warning";
    ionicIcon.name = "done-all";
  }

}
