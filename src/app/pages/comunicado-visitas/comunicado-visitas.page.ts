import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comunicado-visitas',
  templateUrl: './comunicado-visitas.page.html',
  styleUrls: ['./comunicado-visitas.page.scss'],
})
export class ComunicadoVisitasPage implements OnInit {

  // Motivos
  motivos = ["FTC", "Dual"];

  // Empresas
  empresas = ["AtSistemas", "Befresh", "Garpo", "Ultimate", "Sierranet","Gades","Asisur"];

  // Fechas
  fechaVisita: Date = new Date();  
  fechaMin: string = new Date().toISOString().substring(0,10); // La fecha mínima es la fecha de hoy
  hoyMes: number = new Date().getMonth();  
  sigAnio: number = new Date().getFullYear()+1;
  fechaMax: string = new Date(this.sigAnio, this.hoyMes).toISOString().substr(0,10);

  // Array de horas escogidas
  horas_elegidas: EleccionHorario[]=[    
    { // Hora 1
      inicio: "08:00",
      fin: "09:00",
      checkbox: "1",
      radio_deshabilitado: true,
      radio_si: "S1",
      radio_no: "N1"
    },    
    { // Hora 2
      inicio: "09:00",
      fin: "10:00",
      checkbox: "2",
      radio_deshabilitado: true,
      radio_si: "S2",
      radio_no: "N2"
    },    
    { // Hora 3
      inicio: "10:00",
      fin: "11:00",
      checkbox: "3",
      radio_deshabilitado: true,
      radio_si: "S3",
      radio_no: "N3"
    },    
    { // Hora 4
      inicio: "11:20",
      fin: "12:20",
      checkbox: "4",
      radio_deshabilitado: true,
      radio_si: "S4",
      radio_no: "N4"
    },    
    { // Hora 5
      inicio: "12:20",
      fin: "13:20",
      checkbox: "5",
      radio_deshabilitado: true,
      radio_si: "S5",
      radio_no: "N5"
    },    
    { // Hora 6
      inicio: "13:20",
      fin: "14:20",
      checkbox: "6",
      radio_deshabilitado: true,
      radio_si: "S6",
      radio_no: "N6"
    } 
  ];

  datosComunicado: DatosComunicado = {
    usuario: "",
    motivo: "",
    fecha: "",
    horario: [],
    empresa1: "",
    empresa2: ""
  };

  constructor() { }

  ngOnInit() {
  }

  //Motivo
  cambioMotivo(seleccionado){
    console.log('Motivo seleccionado: ', seleccionado);
  }

  // Fecha
  cambioFecha(event){
    console.log("Cambio fecha: ", event.detail.value)
    console.log('fechaMin: ', this.fechaMin)
  }

  // Checkbox pulsado
  pulsadoCheckbox(hora){
    //console.log("Hora pulsada: " + hora.inicio +"-" + hora.fin)
    hora.radio_deshabilitado=!hora.radio_deshabilitado;
  }

  // Enviar pulsado
  /*
  enviarDatos(){
  }
  */
}

// Interfaz de eleccion de horarios
interface EleccionHorario{
  inicio: string;
  fin: string;
  checkbox: string;
  radio_deshabilitado: boolean;
  radio_si: string;
  radio_no: string;
}

// Interfaz para almacenar los datos del comunicado
interface DatosComunicado{
  usuario: string;
  motivo: string;
  fecha: string;
  horario: string[];
  empresa1: string;
  empresa2: string;
}