import { Component, OnInit, Input } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { IHoras, Query } from '../../../interfaces/data.interfaces';



@Component({
  selector: 'app-documento-visita',
  templateUrl: './documento-visita.page.html',
  styleUrls: ['./documento-visita.page.scss'],
})
export class DocumentoVisitaPage implements OnInit {

  constructor(public navCtrl: NavController) {
                this.read_data();
               }

  @Input() empresasIN = [];

  data: Query [] = [];

  motivo: string[];
  empresas: string[];
  horas: Array<IHoras[]>;
  horasIN: Array<IHoras>;
  horasOUT: Array<IHoras>;


  read_data() {
    fetch('./assets/data/queryoption.json').then(res => res.json())
    .then(json => {
      this.data = json;
      // this.motivo = this.data['motivo'];
      // tslint:disable-next-line: no-string-literal
      this.empresas = this.data['empresas'];
      // this.horas = this.data['horas'];
      this.horasIN = [
              // tslint:disable: no-string-literal
        this.data['horas'][0],
        this.data['horas'][1],
        this.data['horas'][2],
        this.data['horas'][4],
        this.data['horas'][5],
        this.data['horas'][6]];

      this.horasOUT = [
        this.data['horas'][1],
        this.data['horas'][2],
        this.data['horas'][3],
        this.data['horas'][5],
        this.data['horas'][6],
        this.data['horas'][7]];
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

}
