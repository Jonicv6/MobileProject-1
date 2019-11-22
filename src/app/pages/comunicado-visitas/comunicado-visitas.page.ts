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
      hay_clase: false,
    },    
    { // Hora 2
      inicio: "09:00",
      fin: "10:00",
      checkbox: "2",
      checkbox_seleccionado: false,
      radio_deshabilitado: true,
      hay_clase: false,
    },    
    { // Hora 3
      inicio: "10:00",
      fin: "11:00",
      checkbox: "3",
      checkbox_seleccionado: false,
      radio_deshabilitado: true,
      hay_clase: false,
    },    
    { // Hora 4
      inicio: "11:20",
      fin: "12:20",
      checkbox: "4",
      checkbox_seleccionado: false,
      radio_deshabilitado: true,
      hay_clase: false,
    },    
    { // Hora 5
      inicio: "12:20",
      fin: "13:20",
      checkbox: "5",
      checkbox_seleccionado: false,
      radio_deshabilitado: true,
      hay_clase: false,
    },    
    { // Hora 6
      inicio: "13:20",
      fin: "14:20",
      checkbox: "6",
      checkbox_seleccionado: false,
      radio_deshabilitado: true,
      hay_clase: false,
    } 
  ];
  
  motivo: string;
  empresa1: string;
  empresa2: string;

  datos: DatosComunicado[]=[];
  horario: Horario[]=[];
  

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
    hora.radio_deshabilitado=!hora.radio_deshabilitado;
  }

  // Hay clases
  hayClases(hora){
    hora.hay_clase=!hora.hay_clase;
    console.log("Hay clase: " + hora.inicio +"-" + hora.fin + " ->" +hora.hay_clase);
  }

  // Enviar pulsado
  
  enviarDatos(){
    // Guardamos los datos del horario del profesor en un array de Horario (almacena hora de inicio y fin de las clases, si realiza visita a esa hora y si tiene clase o no)
    this.horas_elegidas.forEach(element => {
      this.horario.push({
        hora_inicio: element.inicio,
        hora_fin: element.fin,
        realiza_visita: element.checkbox_seleccionado,
        tiene_clase: element.hay_clase,
      });        
    });
      
    this.horario.forEach(element => {
      console.log("Hora:" + element.hora_inicio +"-"+ element.hora_fin+ ": "+ element.realiza_visita + " -> Clases: " + element.tiene_clase)
    });

    //Lógica del método
    if (this.motivo!=null && this.fechaVisita!=null && this.empresa1!=null){
      if(this.empresa2!=null){ // comprobar si empresa2 es nula. 
          
        if (this.empresa1==this.empresa2){ //Si no lo es, comprobar que empresa 1 y 2 no sean iguales.
          console.log("Empresa 1 y empresa 2 no pueden ser iguales")
          
        }else{
          //se toman los datos, se escriben en el json y nos redirigimos a la página de visitas
          // Se crean dos objetos para guardarlo en DatosComunicado, uno por cada empresa
          console.log("Todo perfecto.")
            
          this.datos.push({ //Comunicación de visita de empresa 1
            motivo: this.motivo,
            fecha: this.fechaVisita.toISOString().substring(0,10),
            horario: this.horario,
            empresa: this.empresa1,            
          });
            
          this.datos.push({ //Comunicación de visita de empresa 2
            motivo: this.motivo,
            fecha: this.fechaVisita.toISOString().substring(0,10),
            horario: this.horario,
            empresa: this.empresa2,
          });            
        }  
          

      }else{
        //se toman los datos, se escriben en el json y nos redirigimos a la página de visitas. 
        // Solo se crea un objeto para guardarlo en DatosComunicado
        console.log("Todo perfecto.")
        this.datos.push({  // Comunicación de visita de la única empresa que se va a
          motivo: this.motivo,
          fecha: this.fechaVisita.toISOString().substring(0,10),
          horario: this.horario,
          empresa: this.empresa1,            
        });
      }
    } // fin condiciones
  }// fin metodo enviar datos



}

