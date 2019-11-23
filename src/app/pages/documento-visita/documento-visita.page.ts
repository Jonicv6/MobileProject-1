import { Component, OnInit, Input } from '@angular/core';
import { NavController, NavParams, Platform } from '@ionic/angular';
import { IHoras, Query, DatosComunicado, Horario, Documento } from '../../../interfaces/data.interfaces';
import { ActivatedRoute } from '@angular/router';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
 
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

// tslint:disable: max-line-length



@Component({
  selector: 'app-documento-visita',
  templateUrl: './documento-visita.page.html',
  styleUrls: ['./documento-visita.page.scss'],
})


export class DocumentoVisitaPage implements OnInit {

  pdfMake = require ('pdfmake');
  pdfObj = null;

  nombreProfesor = 'Raul Reyes';
  num: any;
  empresa: string;

  argumentos: DatosComunicado;

  fecha: string;
  empresas: string [] = [];
  horas: Array<IHoras[]>;
  horasIN: string [] = [];
  horasOUT: string [] = [];
  visitas: Array<any[]>;

  documento: Documento [] = [];
  horaInicio: string;
  horaFinal: string;
  email = 'propio';

  constructor(public navCtrl: NavController,
              public activeRoute: ActivatedRoute,
              public file: File,
              public plt: Platform,
              public fileOpener: FileOpener) {
                // this.read_visita();
               }



  read_data() {
    fetch('./assets/data/queryoption.json').then(res => res.json())
    .then(json => {
      this.fecha = new Date().toISOString();
      console.log('Fecha - ' + this.fecha);
      // tslint:disable-next-line: no-string-literal
      this.empresas = json['empresas'];
      // this.horas = this.data['horas'];
      this.horasIN.push(json['horas'][0]['hora'] + ':' + json['horas'][0]['minutos']);
      this.horasIN.push(json['horas'][1]['hora'] + ':' + json['horas'][1]['minutos']);
      this.horasIN.push(json['horas'][2]['hora'] + ':' + json['horas'][2]['minutos']);
      this.horasIN.push(json['horas'][4]['hora'] + ':' + json['horas'][4]['minutos']);
      this.horasIN.push(json['horas'][5]['hora'] + ':' + json['horas'][5]['minutos']);
      this.horasIN.push(json['horas'][6]['hora'] + ':' + json['horas'][6]['minutos']);



      this.horasOUT.push(json['horas'][1]['hora'] + ':' + json['horas'][1]['minutos']);
      this.horasOUT.push(json['horas'][2]['hora'] + ':' + json['horas'][2]['minutos']);
      this.horasOUT.push(json['horas'][3]['hora'] + ':' + json['horas'][3]['minutos']);
      this.horasOUT.push(json['horas'][5]['hora'] + ':' + json['horas'][5]['minutos']);
      this.horasOUT.push(json['horas'][6]['hora'] + ':' + json['horas'][6]['minutos']);
      this.horasOUT.push(json['horas'][7]['hora'] + ':' + json['horas'][7]['minutos']);


   });
  }

  createPDF(){
    const docDefinition = {
      content: [
        {text: '(Con permiso previo: mañana o tarde)', style: 'header'},
        {text: 'Don/Doña ' + this.nombreProfesor + ' profesor/a de este Centro, informa que ha realizado una visita a la empresa ' + this.empresa},
        {text: 'el dia ' + this.fecha.substring(0, 2) + ' de ' + this.fecha.substring(3, 4) + ' de ' + this.fecha.substring(5, 9)},
        {text: 'En las horas indicadas a continuación: '},
        {text: 'de ' + this.horaInicio + ' a ' + this.horaFinal + ' horas'},
        {text: 'El responsable de la empresa (Firma y sello)       El Profesor'},
        {text: 'Fdo:_______________________                Fdo:_______________________', alignment: 'center'},
        {text: 'El plazo máximo para presentar dicho documento será de dos días laboralbes a partir de la realización de dicho desplazamiento.'}

      ],
      style:{
        header: {
          fontSize: 18,
          bold: true,
        }
      }
    };
    this.pdfObj = this.pdfMake.createPDF(docDefinition);
  }


  downloadPdf() {
    const nombrePDF = 'documentoVisita.pdf';

    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });

        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, nombrePDF, blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + nombrePDF, 'application/pdf');
        });
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }


  // read_visita() {
  //   fetch('./assets/data/visitas.json').then(res => res.json())
  //   .then(json => {
  //     // this.motivo = this.data['motivo'];
  //     // tslint:disable-next-line: no-string-literal

  //     // Guardamos el array de Visitas
  //     this.visitas = json['visitas'];

  //     this.visitas.forEach(element => {
  //       console.log(element['id']);
  //     });

  //   });
  // }


  ngOnInit() {

    this.activeRoute.queryParams.subscribe(params => {
      this.argumentos = JSON.parse(params['currency']);
    });
    // this.argumentos = this.activeRoute.snapshot.paramMap.get(visita);
    if ( this.argumentos !== undefined) {
      console.log('Documento - ' + this.argumentos['fecha']);
      // Debemos hacerlo un splir para modificar el orden
      let aux = this.argumentos['fecha'].split('-');
      // Lo recibimos como DD-MM-YYYY y hay que enviarlo como MM-DD-YYYY
      this.fecha = aux[1] + '-' + aux[0] + '-' + aux[2];
      // Enviamos el resto de valores
      this.empresas.push(this.argumentos['empresa']);
      this.horasIN.push(this.argumentos['horario']['hora_inicio']);
      this.horasOUT.push(this.argumentos['horario']['hora_fin']);
    } else {
      this.read_data();
    }
  }


  radioGroupChange(event) {
    // console.log(event.detail.value);
    this.email = event.detail.value;
  }

  enviarDatos() {
    console.log(this.email);
    // Lógica del método
    if (this.horaInicio != null && this.horaFinal != null && this.empresa != null) {
      if ( this.email === null) {
        presentToast('Selecciona un email de destino');
      } else {
        // se toman los datos, se escriben en el json y nos redirigimos a la página de visitas.
        // Solo se crea un objeto para guardarlo en DatosComunicado
        presentToast('Todo perfecto');
        this.documento.push({
          id: -1,
          fecha: this.fecha.substring(8, 10) + '-' + this.fecha.substring(5, 7) + '-' + this.fecha.substring(0, 4),
          hora_inicio: this.horaInicio,
          hora_fin: this.horaFinal,
          empresa: this.empresa,
          email: this.email
        });

        this.documento.forEach(element => {
          console.log('ID: ' + element.id
                   + '\nFecha: ' + element.fecha
                   + '\nInicio: ' + element.hora_inicio
                   + '\nFin: ' + element.hora_fin
                   + '\nEmpresa: ' + element.empresa);
        });

        this.createPDF();
        this.downloadPdf();
      }
    } else { // fin condiciones
      presentToast('Hora de Inicio, Hora de Finalización y Empresa no pueden quedar vacíos.');
    }




    console.log('Pulsado enviar');
  }
}




async function presentToast(message) {
  const toast = document.createElement('ion-toast');
  toast.message = message;
  toast.duration = 4000;
  toast.position = 'middle';
  toast.color = 'dark';
  toast.buttons = [
    {
      text: 'X',
      role: 'cancel',
    }
  ];

  document.body.appendChild(toast);
  return toast.present();
}
