import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getNonHydratedSegmentIfLinkAndUrlMatch } from '../../../node_modules/ionic-angular/umd/navigation/url-serializer';
import {AngularFireDatabase} from "angularfire2/database/database";
import { Card } from '../../model/card.model';
import { Observable, Observer } from '../../../node_modules/rxjs';
import 'rxjs/add/operator/map';
import { UtilitiesProvider } from '../utilities/utilities';
import firebase from 'firebase';
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
  contactsAll$:Observable<any[]>;
  tmp$:Observable<any>;
  calendario$:Observable<any[]>;
  userId="";
   private noteListRef ;
   private noteListAllRef;
   private rubricaListAllRef;
   private calendarioList;
  private myPhotosRef;
    constructor(private db: AngularFireDatabase,private utilities:UtilitiesProvider) {
      
      this.noteListAllRef = this.db.list('/cards/');
      this.myPhotosRef = firebase.storage().ref('/Photos/');
      this.utilities.getUserData().then((us)=>{
        this.userId=us.id;
        this.rubricaListAllRef = this.db.list('/contactos/'+us.id);
      });
     }
  //Recojo las categorias de las noticias! 
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

    //Regreso una lista de noticias mias
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
    //Agrego una noticia nueva
    addNote(card: Card) {
        return this.noteListRef.push(card);
    }
    //Cambio la notica
    updateNote(card: Card) {
      
        return this.noteListRef.update(card.key,card);
    }
    //elimino la noticia
    removeNote(card: Card) {
        return this.noteListRef.remove(card.key);
        
    }

    //regreso todas las noticias generales de qualquiera con su user
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
  //guardo los datos de un user
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
  //regreso un user de firebase a partir de id
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

  //lamar por cards antes de memorizar despues pgar el link hacia firebase en ese mismo ,
  private uploadPhoto(photo): void {
  this.myPhotosRef.child('myPhoto.png')
    .putString(photo, 'base64', { contentType: 'image/png' })
    .then((savedPicture) => {
      console.log( savedPicture.downloadURL);
    });
}
//Agrego un contatto 
addContactList(contacto:any){
  
  return this.rubricaListAllRef.push(contacto);

}
  //regreso la rubrica guardada
getRubrica(){
  
  console.log('rubricas');
  
  this.contactsAll$ = this.rubricaListAllRef.snapshotChanges().map(changes=>{
    return changes.map(c => ({ key: c.payload.key, ...c.payload.val() 
    }));
  });
  return this.contactsAll$;
}
//elimino un contacto que habia sido guardado
removeContact(contacto: any) {

  return this.rubricaListAllRef.remove(contacto.key);
}
//regresa un contacto  si esta bien , si no regreasara []
getContactSaved(md5:string){
  let rubrica = this.db.list('/contactos/'+this.userId,ref => {
    let q = ref.orderByChild("md5").equalTo(md5);
       return q;
  });
  console.log('contacto');
  
  this.contactsAll$ = rubrica.snapshotChanges().map(changes=>{
    return changes.map(c => ({ key: c.payload.key, ...c.payload.val() 
    }));
  });
  return this.contactsAll$;
}
//regresa el calendario a partire del id user y md5Mes
getCalendario(md5Mes:string){
  console.log('calendario');
  this.calendarioList = this.db.list('/calendario/'+this.userId+"/"+md5Mes);
  this.calendario$ = this.calendarioList.snapshotChanges().map(changes=>{
    return changes.map(c => ({ key: c.payload.key, ...c.payload.val() 
    }));
  });
  return this.calendario$;
}
//Guarda el dia en el calendario 
saveDayCalendario(md5Mes:string,day:any){
  console.log('Dia calendario');
  this.calendarioList = this.db.list('/calendario/'+this.userId+"/"+md5Mes);
    return this.calendarioList.push(day).key;
   
}
//hace cambios al dia!
updateDayCalendario(md5Mes:string,day:any){
  console.log('Dia calendario cambiando');
  this.calendarioList = this.db.list('/calendario/'+this.userId+"/"+md5Mes);
  return this.calendarioList.update(day.key,day);
}
//Elimino un dia del calendario!
removeDayCalendario(md5Mes:string,day:any){
  this.calendarioList = this.db.list('/calendario/'+this.userId+"/"+md5Mes);
  return this.calendarioList.remove(day.key);
}


}