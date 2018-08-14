import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, PopoverController, Events} from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,public service : ServiceCenterProvider,private serviceN:NotesProvider,
    public loadingCtrl: LoadingController,private popoverCtrl: PopoverController,public events: Events){
    
  }

  ngOnInit(){

    this.initializeCards("Cargando Datoss...");

 }
  initializeCards(comment:string){

    let loader = this.loadingCtrl.create({
      content: comment
    });
    loader.present().then(()=> {
      this.serviceN.getNoteList().subscribe(res => {
        this.lista = res;
        if(res)loader.dismiss();
      });
    })
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
      this.serviceN.removeNote(card).then(()=>{
        this.initializeCards("Eliminando objeto seleccionado");
      });
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
  filtrarCards($event) {
    
    const popover = this.popoverCtrl.create('FiltrarCardsPage', { cards: this.lista });
    popover.present({
      ev: $event
    });
    
  } 
  
  ionViewDidLoad() {
    this.events.subscribe('challenges:filtered', (retosFiltrados) => {
      if(retosFiltrados.length>0)
        this.lista = retosFiltrados;
    })
  }
}
