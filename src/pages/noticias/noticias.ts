import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceCenterProvider } from '../../providers/service-center/service-center';
import 'rxjs/add/operator/toPromise';
import { NewResponse } from '../../providers/FirstResponse';
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

  lista : Array<any> = [
    {
      img:"https://img.bekia.es/cocina/0000/179/2.jpg",
      title:"Arroz con pollo",
      date:"November 20, 2016",
      comm:"Me cayo muy mal la comida!",
      ctg:"comida",
      state:"happy"
    },
    {
      img:"http://www.lacocinademona.com/wp-content/uploads/2015/09/aeropuerto-chifa-721x541.jpg",
      title:"Arroz Chaufa",
      date:"November 5, 2018",
      comm:"Me senti como un nino al almorzar en mi abuela!",
      ctg:"comida",
      state:"sad"
    },
  {
      img:"https://i3.wp.com/tiempodenegocios.com/wp-content/uploads/2017/10/lista-de-tareas-700x406.jpg",
      title:"Matematicas",
      date:"November 3, 2018",
      comm:"No pude resolver esta maldita equacion!",
      ctg:"escuela",
      state:"sad"
  }
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams,public service : ServiceCenterProvider) {

    this.info ="aeropuerto";
    
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
