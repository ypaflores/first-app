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

  modeKeys = [
    'comida',
    'deporte',
    'escuela',
    'trabajo',
    'chismes'
  ]

  private noteListRef = this.db.list<Card>('/cards/');
 
    constructor(private db: AngularFireDatabase) { }
    
  getCategorie(){
    return this.modeKeys;
  }
   getNotesSearch(val,lista:Card[]){

    if (val && val.trim() != '') {
      return  lista.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else{
      return [];
    }
  }
  getNotesSearchState(val,lista:Card[]){

      return  lista.filter((item) => {
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
