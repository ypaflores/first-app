import { Component, OnInit } from '@angular/core';
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
export class NoticiasPage implements OnInit {
  info:string;
  dati:NewResponse=new NewResponse();

  lista :Card[];
  noteList: Observable<Card[]>

  constructor(public navCtrl: NavController, public navParams: NavParams,public service : ServiceCenterProvider,private serviceN:NotesProvider) {

    
  }

  ngOnInit(){

    this.initializeCards();

 }
  initializeCards(){

    this.serviceN.getNoteList().subscribe(res => {
      this.lista = res;
    });
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
    this.lista= this.serviceN.getNotesSearch(val,this.lista);
  }
  searchState(key:any){
    const val = key.target.value;
    this.lista= this.serviceN.getNotesSearchState(val,this.lista);
  }

  goToUpdate(card:Card){
    
    this.navCtrl.push("InsertNoticiaPage", {
      element: card,
    });

  
}
   
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
}
