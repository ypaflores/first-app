import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getNonHydratedSegmentIfLinkAndUrlMatch } from '../../../node_modules/ionic-angular/umd/navigation/url-serializer';
import {AngularFireDatabase} from "angularfire2/database/database";
import { Card } from '../../model/card.model';
import { Observable } from '../../../node_modules/rxjs';

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
  courses$: Observable<Card[]>;
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
      this.courses$ = this.noteListRef.snapshotChanges().map(changes=>{
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() 
        }));
      });
      console.log("ola");
        return this.courses$;
    }
    getNoteList2() {
      return this.db.list<Card>('cards');
  }
    
 
    addNote(card: Card) {
        return this.noteListRef.push(card);
    }
 
    updateNote(card: Card) {
      
        return this.noteListRef.update(card.key,card);
    }
 
    removeNote(card: Card) {
        return this.noteListRef.remove(card.key);
        
    }
}
