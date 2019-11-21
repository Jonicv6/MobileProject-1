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
