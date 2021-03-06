import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { NotesProvider } from '../../providers/notes/notes';

/**
 * Generated class for the NoticiasGeneralesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-noticias-generales',
  templateUrl: 'noticias-generales.html',
})
export class NoticiasGeneralesPage {
  lista :any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private serviceNotes:NotesProvider, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoticiasGeneralesPage');
  }
  //recojo  todas mis noticias generales de todos , si no hay ninguna me da vuoto!
  ngOnInit(){

    this.initializeCards("Cargando Datoss...");

 }
  //hay un loader para que cargue mientras , puedo cambiarlo a como de lampeggiare per un po.
  private initializeCards(comment:string){
    
    let loader = this.loadingCtrl.create({
      content: comment
    });
    loader.present().then(()=> {
      this.serviceNotes.getNotesAllList().then(res => {
        this.lista = res;
        if(res)loader.dismiss();
        console.log(this.lista);
        
      });
    })
  }
}
