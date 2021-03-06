import { Component, OnInit } from '@angular/core';
import { EleccionHorario, DatosComunicado, Horario } from 'src/interfaces/data.interfaces';
import { AlertController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';


@Component({
  selector: 'app-comunicado-visitas',
  templateUrl: './comunicado-visitas.page.html',
  styleUrls: ['./comunicado-visitas.page.scss'],
})
export class ComunicadoVisitasPage implements OnInit {

  // Motivos
  motivos = ['FTC', 'Dual'];

  // Empresas
  empresas = ['AtSistemas', 'Befresh', 'Garpo', 'Ultimate', 'Sierranet', 'Gades', 'Asisur'];

  // Fechas
  fechaVisita: Date = new Date();
  fechaMin: string = new Date().toISOString().substring(0, 10); // La fecha mínima es la fecha de hoy
  hoyMes: number = new Date().getMonth();
  sigAnio: number = new Date().getFullYear() + 1;
  fechaMax: string = new Date(this.sigAnio, this.hoyMes).toISOString().substr(0, 10);

  // Array de horas escogidas
  horas_elegidas: EleccionHorario[] = [
    { // Hora 1
      inicio: '08:00',
      fin: '09:00',
      checkbox: '1',
      checkbox_seleccionado: false,
      boton_deshabilitado: true,
      hay_clase: false,
      cual_asignatura: '',
      cual_aula: ''

    },
    { // Hora 2
      inicio: '09:00',
      fin: '10:00',
      checkbox: '2',
      checkbox_seleccionado: false,
      boton_deshabilitado: true,
      hay_clase: false,
      cual_asignatura: '',
      cual_aula: ''
    },
    { // Hora 3
      inicio: '10:00',
      fin: '11:00',
      checkbox: '3',
      checkbox_seleccionado: false,
      boton_deshabilitado: true,
      hay_clase: false,
      cual_asignatura: '',
      cual_aula: ''
    },
    { // Hora 4
      inicio: '11:20',
      fin: '12:20',
      checkbox: '4',
      checkbox_seleccionado: false,
      boton_deshabilitado: true,
      hay_clase: false,
      cual_asignatura: '',
      cual_aula: ''
    },
    { // Hora 5
      inicio: '12:20',
      fin: '13:20',
      checkbox: '5',
      checkbox_seleccionado: false,
      boton_deshabilitado: true,
      hay_clase: false,
      cual_asignatura: '',
      cual_aula: ''
    },
    { // Hora 6
      inicio: '13:20',
      fin: '14:20',
      checkbox: '6',
      checkbox_seleccionado: false,
      boton_deshabilitado: true,
      hay_clase: false,
      cual_asignatura: '',
      cual_aula: ''
    }
  ]; // fin de array de horas escogidas

  motivo: string;
  empresa1: string;
  empresa2: string;

  datos: DatosComunicado[] = [];
  horario: Horario[] = [];
  
  last_id: number;

  constructor(private alertCtrl: AlertController, private file: File) { 
    this.read_visita();
   }

  ngOnInit() {

  }


  // Checkbox pulsado
  pulsadoCheckbox(hora) {
    hora.boton_deshabilitado = !hora.boton_deshabilitado;
  }

  // Hay clases
  hayClases(hora) {
    hora.hay_clase = !hora.hay_clase;    
   // console.log('Hay clase: ' + hora.inicio + '-' + hora.fin + ' ->' + hora.hay_clase);
  }

  // Enviar los datos rellenados en el formulario.
  enviarDatos() {
    var contador_visita=0; // Contamos si el usuario ha pulsado al menos una hora de visita.
    this.horas_elegidas.forEach(element=>{
      if (element.checkbox_seleccionado){
        contador_visita=contador_visita+1;
      }
    });
  
    // Se podrá proceder a crear un pdf si hay motivo, fecha, empresa1 y se ha marcado, al menos, una hora de visita
    if (this.motivo != null && this.fechaVisita != null && this.empresa1 != null && contador_visita>0) {
      if (this.empresa2 != null && this.empresa2 !== 'ninguna') { // comprobar si empresa2 es nula o vacía.

        if (this.empresa1 === this.empresa2) { // Si no lo es, comprobar que empresa 1 y 2 no sean iguales.
          // console.log("Empresa 1 y empresa 2 no pueden ser iguales")
          presentToast('Empresa 1 y Empresa 2 no pueden ser iguales');

        } else {
          // Se crean dos objetos para guardarlo en DatosComunicado, uno por cada empresa
          presentToast('Todo perfecto.');

          // Guardamos los datos del horario del profesor en un array de Horario 
          // (almacena hora de inicio y fin de las clases, si realiza visita a esa hora y si tiene clase o no)
          this.horas_elegidas.forEach(element => {
            this.horario.push({
              hora_inicio: element.inicio,
              hora_fin: element.fin,
              realiza_visita: element.checkbox_seleccionado,
              tiene_clase: element.hay_clase,
              asignatura: element.cual_asignatura,
              aula: element.cual_aula
            });
          });

          this.datos.push({ // Comunicación de visita de empresa 1
            id: (this.last_id+1), // cambiar id leyendo el último elemento del json
            motivo: this.motivo,
            fecha: this.fechaVisita.getDay() + '-' + this.fechaVisita.getMonth() + '-' + this.fechaVisita.getFullYear(),
            horario: this.horario,
            empresa: this.empresa1,
            validado: false
          });

          this.datos.push({ // Comunicación de visita de empresa 2
            id: (this.last_id+2), // cambiar id leyendo el último elemento del json
            motivo: this.motivo,
            fecha: this.fechaVisita.getDay() + '-' + this.fechaVisita.getMonth() + '-' + this.fechaVisita.getFullYear(),
            horario: this.horario,
            empresa: this.empresa2,
            validado: false
          });

         
        }

         this.datos.forEach(element => {
           console.log('ID: ' + element.id
                    + '\nMotivo: ' + element.motivo
                   + '\nFecha: ' + element.fecha
                   + '\nEmpresa: ' + element.empresa);
         });

      } else {
        // Guardamos los datos del horario del profesor en un array de Horario 
        // (almacena hora de inicio y fin de las clases, si realiza visita a esa hora y si tiene clase o no)
        this.horas_elegidas.forEach(element => {
          this.horario.push({
            hora_inicio: element.inicio,
            hora_fin: element.fin,
            realiza_visita: element.checkbox_seleccionado,
            tiene_clase: element.hay_clase,
            asignatura: element.cual_asignatura,
            aula: element.cual_aula
          });
        });
        
        // Solo se crea un objeto para guardarlo en DatosComunicado
        presentToast('Todo perfecto.');
        this.datos.push({  // Comunicación de visita de la única empresa que se va a
          id: (this.last_id+1),
          motivo: this.motivo,
          fecha: this.fechaVisita.getDay() + '-' + this.fechaVisita.getMonth() + '-' + this.fechaVisita.getFullYear(),
          horario: this.horario,
          empresa: this.empresa1,
          validado: false
        });

         this.datos.forEach(element => {
           console.log('ID: ' + element.id
                    + '\nMotivo: ' + element.motivo
                    + '\nFecha: ' + element.fecha
                    + '\nEmpresa: ' + element.empresa);
         });
        
        // se toman los datos, se escriben en el json 
      }

    } else { // fin condiciones      
      presentToast('Requisitos: Motivo, Fecha y Empresa 1 no pueden quedar vacíos. Debe seleccionar al menos una hora para realizar su visita.');

    }
  }// fin metodo enviar datos


  // Alert para modificar la asignatura.
  async modificarAsignatura(hora) {
    if (!hora.hay_clase) {
      const alert = await this.alertCtrl.create({
        header: 'Modificar asignatura',
        subHeader: 'No hay clases en este tramo horario.',
        message: 'No hay asignatura que modificar.',
        buttons: ['OK']
      });

      await alert.present();
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Modificar asignatura',
        subHeader: 'Clase: ' + hora.inicio + '-' + hora.fin,
        inputs: [
          {
            name: 'asign',
            type: 'text',
            placeholder: 'Escribe una asignatura.'
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => { presentToast('No has introducido la asignatura.'); }
        },
        {
          text: 'OK',
          handler: (dato) => {
            if (dato.asign!==""){
              hora.cual_asignatura = dato.asign;
              presentToast('A las ' + hora.inicio + '-' + hora.fin + ' da clase de ' + hora.cual_asignatura);
            }else{ presentToast('No has introducido la asignatura.'); }
          }
        }
      ]
      });

      await alert.present();
    }
  }

  // Alert para modificar el aula.
  async modificarAula(hora) {
    if (!hora.hay_clase) {
      const alert = await this.alertCtrl.create({
        header: 'Modificar aula',
        subHeader: 'No hay clases en este tramo horario.',
        message: 'No hay aula que modificar.',
        buttons: ['OK']
      });

      await alert.present();
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Modificar aula',
        subHeader: 'Aula',
        inputs: [
          {
            name: 'aul',
            type: 'text',
            placeholder: 'Escribe el aula.'
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => { presentToast('No has introducido el aula.'); }
        },
        {
          text: 'OK',
          handler: (dato) => {
            if (dato.aula!==""){
              hora.cual_aula = dato.aula;
              presentToast('A las ' + hora.inicio + '-' + hora.fin + ' da clase en el aula ' + hora.cual_aula);
            }else{ presentToast('No has introducido el aula.'); }
          }
        }
      ]
      });

      await alert.present();
    }
  }

  // Obtener el último id
  read_visita() {
    var lista_id: number[]=[]
    fetch('./assets/data/visitas.json').then(res => res.json())
    .then(json => {
      

      // Iteramos el array del Json 'Visitas'
       json.visitas.forEach((element: DatosComunicado[]) => {
      
        lista_id.push(element['id']);

        console.log(lista_id);
        
      });

      this.last_id=lista_id[lista_id.length-1];
      console.log("En read_visita: "+this.last_id)
    });
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
