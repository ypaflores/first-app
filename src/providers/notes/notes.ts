import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getNonHydratedSegmentIfLinkAndUrlMatch } from '../../../node_modules/ionic-angular/umd/navigation/url-serializer';

/*
  Generated class for the NotesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotesProvider {

  lista : Array<any> = [
    {
      img:"https://img.bekia.es/cocina/0000/179/2.jpg",
      title:"Arroz con pollo",
      date:"November 20, 2016",
      comm:"Me cayo muy mal la comida!",
      ctg:"comida",
      state:"happy"
    },
    {
      img:"http://www.lacocinademona.com/wp-content/uploads/2015/09/aeropuerto-chifa-721x541.jpg",
      title:"Arroz Chaufa",
      date:"November 5, 2018",
      comm:"Me senti como un nino al almorzar en mi abuela!",
      ctg:"comida",
      state:"sad"
    },
  {
      img:"https://i3.wp.com/tiempodenegocios.com/wp-content/uploads/2017/10/lista-de-tareas-700x406.jpg",
      title:"Matematicas",
      date:"November 3, 2018",
      comm:"No pude resolver esta maldita equacion!",
      ctg:"escuela",
      state:"sad"
  }
  ]
  getNotes(){
    return this.lista;
  }

}
