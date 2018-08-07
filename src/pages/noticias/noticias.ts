import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { ServiceCenterProvider } from '../../providers/service-center/service-center';
import 'rxjs/add/operator/toPromise';
import { NewResponse } from '../../providers/FirstResponse';
import { NotesProvider } from '../../providers/notes/notes';
import { Observable } from 'rxjs/Observable';
import { Card } from '../../model/card.model';
import { InsertNoticiaPage } from '../insert-noticia/insert-noticia';
import 'rxjs/Rx';
import 'rxjs/add/operator/map'
/**
 * Generated class for the NoticiasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-noticias',
  templateUrl: 'noticias.html',
})
export class NoticiasPage {
  info:string;
  dati:NewResponse=new NewResponse();

  lista : any;
  noteList: Observable<Card[]>
  tmp:Card[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public service : ServiceCenterProvider,private serviceN:NotesProvider) {

    this.info ="aeropuerto";
    this.initializeCards();
    
  }

  initializeCards(){

    this.lista = this.serviceN.getNotes();
    //this.noteList=this.serviceN.getNoteList();
    
  }


  firstRequest(){
  
    this.service.search().then(
      data => this.dati = data,
      errorCode => alert('error fatal!'));

  }

  goToAddNews(){
    
    this.navCtrl.push('InsertNoticiaPage');
  }

  deleteElement(card:Card){
    alert("Rimuovere este elemento "+card.key);
      this.serviceN.removeNote(card);
    
    
  }

  search(key: any){

    const val = key.target.value;
    this.lista= this.serviceN.getNotesSearch(val);
  }
  searchState(key:any){
    const val = key.target.value;
    this.lista= this.serviceN.getNotesSearchState(val);
  }

  goToUpdate(card:Card){
    /*
    this.navCtrl.push("InsertNoticiaPage", {
      element: card,
    });*/

    this.serviceN.getNoteList().subscribe(res => {
      console.log("res" + res);
      this.tmp = res;
      res.forEach(item => {
        console.log("item " + item.title + "!" );
      });
    });

}
   
    

  /*
    console.log("estoy aqui!");
    console.log(card);*/
    
/*
    this.noteList=this.serviceN.getNoteList2()
    .snapshotChanges()
    .map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      })
    .map(changes => changes.reverse());

    console.log(this.noteList);

    console.log(this.serviceN.getNoteList());

    */



}
