import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  //array de Pagina
  paginas: Pagina[] = [
    {
      imagen: 'assets/img/checklist.png',
      nombre: 'Listado de visitas',
      redireccion: '/listado-visitas',
      descripcion: 'Es un icono de una lista.'
    },
    {
      imagen: 'assets/img/megaphone.png',
      nombre: 'Comunicado de visita',
      redireccion: '/comunicado-visitas',
      descripcion: 'Es un icono de un megáfono.'
    },
    {
      imagen: 'assets/img/attach.png',
      nombre: 'Documento de visita',
      redireccion: '/documento-visita',
      descripcion: 'Es un icono de un documento.'
    }    
  ];// fin redirecciones

  constructor() { }

  ngOnInit() {
  }

}

interface Pagina{
  imagen: string;
  nombre: string;
  redireccion: string;
  descripcion: string;
}