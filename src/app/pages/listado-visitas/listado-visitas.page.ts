import { Component, OnInit } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';
import { IHoras, DatosComunicado, Horario } from '../../../interfaces/data.interfaces';

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

  setParamsSend(visita) {

    this.navCtrl.navigateForward('/comunicado-visitas', visita);
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
        var horaInicio = '';
        var horaFin = '';
        // Usamos esta variable para comprobar que las horas sean concurrentes
        var continuar = true;

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
          tiene_clase: element['horario']['tiene_clase']
          //Al actualizar la rama añadir los valores de asignatura y aula
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

        // Volvemos a inicializar los valores de Horas


        console.log(this.lista);
      });



    });


  }



}

// Metodo para mostrar un mensaje corto

// async presentToast() {
//   const toast = await this.toastController.create({
//     message: 'Your settings have been saved.',
//     duration: 2000
//   });
//   toast.present();
// }
