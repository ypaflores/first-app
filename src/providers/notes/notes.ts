import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getNonHydratedSegmentIfLinkAndUrlMatch } from '../../../node_modules/ionic-angular/umd/navigation/url-serializer';
import {AngularFireDatabase} from "angularfire2/database/database";
import { Card } from '../../model/card.model';

/*
  Generated class for the NotesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotesProvider {

  lista : Array<any> = [
    {
      key:"-LIzKb6q4uqlViXCMFKI",
      img:"https://img.bekia.es/cocina/0000/179/2.jpg",
      title:"Arroz con pollo",
      date:"November 20, 2016",
      comm:"Me cayo muy mal la comida!",
      ctg:"comida",
      state:"happy"
    },
    {
      key:"-LIzNDeDzaXKsINOWVIz",
      img:"http://www.lacocinademona.com/wp-content/uploads/2015/09/aeropuerto-chifa-721x541.jpg",
      title:"Arroz Chaufa",
      date:"November 5, 2018",
      comm:"Me senti como un nino al almorzar en mi abuela!",
      ctg:"comida",
      state:"sad"
    },
  {
      //key:"-LIzOT4aHku-jESTbrs3",
      img:"https://i3.wp.com/tiempodenegocios.com/wp-content/uploads/2017/10/lista-de-tareas-700x406.jpg",
      title:"Matematicas",
      date:"November 3, 2018",
      comm:"No pude resolver esta maldita equacion!",
      ctg:"escuela",
      state:"sad"
  }
  ]

  modeKeys = [
    'comida',
    'deporte',
    'escuela',
    'trabajo',
    'chismes'
  ]

  private noteListRef = this.db.list<Card>('/cards/');
 
    constructor(private db: AngularFireDatabase) { }
    
  getNotes(){
    return this.lista;
  }
  getCategorie(){
    return this.modeKeys;
  }
   getNotesSearch(val){

    if (val && val.trim() != '') {
      return  this.lista.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else{
      return this.lista;
    }
  }
  getNotesSearchState(val){

      return  this.lista.filter((item) => {
        return (item.state.toLowerCase() ==val.toLowerCase());
      })
  }

 
    getNoteList() {
        return this.noteListRef.valueChanges();
    }
    getNoteList2() {
      return this.db.list<Card>('cards');
  }
    
 
    addNote(card: Card) {
        return this.noteListRef.push(card);
    }
 
    updateNote(card: Card) {
      alert("esta modificando");
        return this.noteListRef.update(card.key,card);
    }
 
    removeNote(card: Card) {
      alert("esta eliminando");
        return this.noteListRef.remove(card.key);
        
    }
}
