export interface Query {
    motivo?: string[];
    empresas?: string[];
    horas?: (IHoras);
  }

export interface IHoras {
    id?: number;
    hora?: string;
    minutos?: string;
 }

 // Interfaz de eleccion de horarios
export interface EleccionHorario{
  inicio: string;
  fin: string;
  checkbox: string;
  checkbox_seleccionado: boolean,
  radio_deshabilitado: boolean;
  
}

// Interfaz para almacenar los datos del comunicado
export interface DatosComunicado{
  
  motivo: string;
  fecha: string;
  horario: Horario[];
  empresa1: string;
  empresa2: string;
}

// Interfaz para almacenar el horario del profesor
export interface Horario{
  hora: string;
  clase: boolean;
}