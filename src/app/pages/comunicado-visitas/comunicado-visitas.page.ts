import { Component, OnInit } from '@angular/core';
import { EleccionHorario, DatosComunicado, Horario } from 'src/interfaces/data.interfaces';
import { FormGroup, FormBuilder } from '@angular/forms';


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
      checkbox_seleccionado: false,
      radio_deshabilitado: true,
    },    
    { // Hora 2
      inicio: "09:00",
      fin: "10:00",
      checkbox: "2",
      checkbox_seleccionado: false,
      radio_deshabilitado: true,
    },    
    { // Hora 3
      inicio: "10:00",
      fin: "11:00",
      checkbox: "3",
      checkbox_seleccionado: false,
      radio_deshabilitado: true,
    },    
    { // Hora 4
      inicio: "11:20",
      fin: "12:20",
      checkbox: "4",
      checkbox_seleccionado: false,
      radio_deshabilitado: true,
    },    
    { // Hora 5
      inicio: "12:20",
      fin: "13:20",
      checkbox: "5",
      checkbox_seleccionado: false,
      radio_deshabilitado: true,
    },    
    { // Hora 6
      inicio: "13:20",
      fin: "14:20",
      checkbox: "6",
      checkbox_seleccionado: false,
      radio_deshabilitado: true,
    } 
  ];
  
  motivo: string;
  empresa1: string;
  empresa2: string;

  constructor() {  }

  ngOnInit() {
  }


  // Fecha
  cambioFecha(event){
    console.log("Cambio fecha: ", event.detail.value)
    console.log('fechaMin: ', this.fechaMin)
  }

  // Checkbox pulsado
  pulsadoCheckbox(hora){
    console.log("Hora pulsada: " + hora.inicio +"-" + hora.fin)
    hora.radio_deshabilitado=!hora.radio_deshabilitado;
  }

  // Enviar pulsado
  
  enviarDatos(){
    console.log(this.motivo 
      + " \n" + this.fechaVisita.getDay() + "-"+ this.fechaVisita.getMonth() +"-"+ this.fechaVisita.getFullYear()
      + " \n" + this.empresa1
      + " \n" + this.empresa2);

      this.horas_elegidas.forEach(element => {
        console.log("\nHora:" + element.inicio +"-"+ element.fin+ ": "+ element.checkbox_seleccionado + " -> Clases: " + element.checkbox_seleccionado.valueOf())
      });

      //Lógica del método
      if (this.motivo==null || this.fechaVisita==null || this.empresa1==null){
        //algo pasa
        console.log("Error. Motivo, o fecha o empresa1 son nulas")
      }else{
        // comprobar si empresa2 es nula. Si no lo es, comprobar que empresa 1 y 2 no sean iguales.
        if(this.empresa2!=null){
          if (this.empresa1==this.empresa2){
            console.log("Empresa 1 y empresa 2 no pueden ser iguales")
          }else{
            //se toman los datos, se escriben en el json y nos redirigimos a la página de visitas
            console.log("Todo perfecto.")
          }
        }else{
          //se toman los datos, se escriben en el json y nos redirigimos a la página de visitas
          console.log("Todo perfecto.")
        }

      }
  }



}

