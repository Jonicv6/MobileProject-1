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
export interface EleccionHorario {
  inicio: string;
  fin: string;
  checkbox: string;
  checkbox_seleccionado: boolean;
  boton_deshabilitado: boolean;
  hay_clase: boolean;
  cual_asignatura: string;
  cual_aula: string;
}

// Interfaz para almacenar los datos del comunicado
export interface DatosComunicado {
  id: number;
  motivo: string;
  fecha: string;
  horario: Horario[];
  empresa: string;
  validado: boolean;
}

// Interfaz para almacenar el horario del profesor
export interface Horario {
  hora_inicio: string;
  hora_fin: string;
  realiza_visita: boolean;
  tiene_clase: boolean;
  asignatura: string;
  aula: string;
}

// Interfaz para almacenar los datos del DocumentoVisita
export interface Documento {
  id: number;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  empresa: string;
  email: string;
}
