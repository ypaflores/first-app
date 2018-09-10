import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getNonHydratedSegmentIfLinkAndUrlMatch } from '../../../node_modules/ionic-angular/umd/navigation/url-serializer';
import {AngularFireDatabase} from "angularfire2/database/database";
import { Card } from '../../model/card.model';
import { Observable } from '../../../node_modules/rxjs';
import 'rxjs/add/operator/map';
import { UtilitiesProvider } from '../utilities/utilities';
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
  coursesAll$:Observable<any[]>;
  tmp$:Observable<any>;
  userId="";
   private noteListRef ;
   private noteListAllRef;
  
    constructor(private db: AngularFireDatabase,private utilities:UtilitiesProvider) {
      
      this.noteListAllRef = this.db.list('/cards/');
     }
    
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

 
    getNoteList(id) {
      this.noteListRef = this.db.list<Card>('/cards/',ref => {
        let q = ref.orderByChild("idUser").equalTo(id);
           return q;
      });
      this.courses$ =this.noteListRef.snapshotChanges().map(changes=>{
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() 
        }));
      });
      this.courses$.subscribe((res)=>{
        console.log(res);
      });
      
        return this.courses$;
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


    getNotesAllList(){
      this.coursesAll$ = this.noteListAllRef.snapshotChanges().map(changes=>{
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() 
        }));
      });
      return new Promise((resolve, reject) => {
      this.coursesAll$.subscribe(res=>{
        res.forEach(element => {
            this.getUserimgFirebase(element.idUser).then((user)=>{
                element.user=user;
            });
        });
          resolve(res);
      });
    });
  }




    writeUserData(userId, name, email, password,img) {
        this.db.database.ref('users/' + userId).set({
          username: name,
          email: email,
          password : password,
          image:img
        });
    }

    asignImgUser(userId,img){
      this.db.database.ref('users/' + userId).set({
          image:img
      });
    }
    getUserInfFirebase(userId){
      return new Promise((resolve, reject) => {
      this.tmp$ =  this.db.object('users/'+userId).snapshotChanges().map(res => {
          return res.payload.val();
          });
      this.tmp$.subscribe(res => {
          res.id=userId;
          resolve(res);
      });
    });
  }

  getUserimgFirebase(userId){
    return new Promise((resolve, reject) => {
    this.tmp$ =  this.db.object('users/'+userId).snapshotChanges().map(res => {
        return res.payload.val();
        });
    this.tmp$.subscribe(res => {
        resolve({username:res.username,img:res.image});
    });
  });
}


}
