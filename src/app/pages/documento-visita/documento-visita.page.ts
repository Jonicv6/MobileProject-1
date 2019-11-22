import { Component, OnInit, Input } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { IHoras, Query } from '../../../interfaces/data.interfaces';
import { EmailComposer } from '@ionic-native/email-composer/ngx';



@Component({
  selector: 'app-documento-visita',
  templateUrl: './documento-visita.page.html',
  styleUrls: ['./documento-visita.page.scss'],
})


export class DocumentoVisitaPage implements OnInit {
  num: any;

  constructor(public navCtrl: NavController,
              public emailcomposer: EmailComposer) {
                this.read_data();
                this.read_visita();
               }

  @Input() empresasIN = [];

  motivo: string[];
  empresas: string[];
  horas: Array<IHoras[]>;
  horasIN: Array<IHoras>;
  horasOUT: Array<IHoras>;

  visitas: Array<any[]>;

  read_data() {
    fetch('./assets/data/queryoption.json').then(res => res.json())
    .then(json => {
      // this.motivo = this.data['motivo'];
      // tslint:disable-next-line: no-string-literal
      this.empresas = json['empresas'];
      // this.horas = this.data['horas'];
      this.horasIN = [
              // tslint:disable: no-string-literal
        json['horas'][0],
        json['horas'][1],
        json['horas'][2],
        json['horas'][4],
        json['horas'][5],
        json['horas'][6]];

      this.horasOUT = [
        json['horas'][1],
        json['horas'][2],
        json['horas'][3],
        json['horas'][5],
        json['horas'][6],
        json['horas'][7]];
    });
  }


  read_visita() {
    fetch('./assets/data/visitas.json').then(res => res.json())
    .then(json => {
      // this.motivo = this.data['motivo'];
      // tslint:disable-next-line: no-string-literal

      // Guardamos el array de Visitas
      this.visitas = json['visitas'];

      this.visitas.forEach(element => {
        console.log(element["id"]);
      });

    });
  }




  // tslint:disable-next-line: member-ordering
  public event = {
    month: '01-01-2019',
    timeStarts: '08:00',
    timeEnds: '14:20'
  };



  onSelect($event) {
    console.log($event.target.value);
    if (this.empresas.length > 2) {
        console.log('Selecciona maxima de 2 empresas');

     }
  }


  ngOnInit() {

  }

  enviarDatos(){
    console.log("Pulsado enviar")
  }
}
