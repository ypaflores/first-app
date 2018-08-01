import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceCenterProvider } from '../../providers/service-center/service-center';
import 'rxjs/add/operator/toPromise';
import { NewResponse } from '../../providers/FirstResponse';
import { NotesProvider } from '../../providers/notes/notes';
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

  lista : Array<any> ;

  constructor(public navCtrl: NavController, public navParams: NavParams,public service : ServiceCenterProvider,private serviceN:NotesProvider) {

    this.info ="aeropuerto";
    this.lista = this.serviceN.getNotes();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoticiasPage');
  }

  onError($event) {
    console.log('error()');
    console.log($event);
  }

  firstRequest(){
  
    this.service.search().then(
      data => this.dati = data,
      errorCode => alert('error fatal!'));

  }

  goToAddNews(){
    
    this.navCtrl.push('InsertNoticiaPage');
  }

  deleteElement(){
    alert("Rimuovere este elemento");
  }
}
