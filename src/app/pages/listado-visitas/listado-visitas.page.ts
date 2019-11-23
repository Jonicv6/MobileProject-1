import { Component, OnInit } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';
import { IHoras, DatosComunicado, Horario } from '../../../interfaces/data.interfaces';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-listado-visitas',
  templateUrl: './listado-visitas.page.html',
  styleUrls: ['./listado-visitas.page.scss'],
})
export class ListadoVisitasPage implements OnInit {

  lista: Array<DatosComunicado> = [];
  visitas: DatosComunicado[] = [];
  horas: Horario[] = [];


  constructor(public toastController: ToastController,
              private navCtrl: NavController) {
      this.read_visita();
    }

  setParamsSend(visita: DatosComunicado) {

    const navigationExtras: NavigationExtras = {
      queryParams: {
          currency: JSON.stringify(visita)
      }
    };
    this.navCtrl.navigateForward(['documento-visita'], navigationExtras);
  }

  ngOnInit() {
    }


  read_visita() {
    fetch('./assets/data/visitas.json').then(res => res.json())
    .then(json => {
      // this.motivo = this.data['motivo'];
      // tslint:disable-next-line: no-string-literal

      // Iteramos el array del Json 'Visitas'
       json.visitas.forEach((element: DatosComunicado[]) => {
        // console.log('Dentro bucle DatosComunicado');

        // Variables temporales
        let horaInicio = '';
        let horaFin = '';
        // Usamos esta variable para comprobar que las horas sean concurrentes
        let continuar = true;

          // tslint:disable: no-string-literal
        element['horario'].forEach((subelement: Horario) => {
          // console.log('Dentro bucle Horario');
          // Capturamos los valores del comienzo y el final de la visita
          if (subelement.realiza_visita && continuar) {
            // console.log(horaInicio + ' - ' + horaFin);

            // Solamente se cumple esta condicion una sola vez, la primera hora que encuentre valida
            if (horaInicio === '') {
              horaInicio = subelement.hora_inicio;
            }

            // Machaca todos los valores hasta ser el último válido
            horaFin = subelement.hora_fin;

          } else if (horaInicio !== '') {
            // Continua hasta que al menos no tenga la hora inicio asignada
            continuar = false;
          }
        });

        this.horas = Object({
          hora_inicio: horaInicio,
          hora_fin: horaFin,
          realiza_visita: element['horario']['realiza_visita'],
          tiene_clase: element['horario']['tiene_clase'],
          asignatura: element['horario']['asignatura'],
          aula: element['horario']['aula']
          // Al actualizar la rama añadir los valores de asignatura y aula
        });
        console.log(this.horas);


        this.lista.push({
          id: element['id'],
          motivo: element['motivo'],
          fecha: element['fecha'],
          horario: this.horas,
          empresa: element['empresa'],
          validado: element['validado']

        });

        console.log(this.lista);
      });



    });


  }



}
