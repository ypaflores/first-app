import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ViewController } from 'ionic-angular';

/**
 * Generated class for the FiltrarCardsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filtrar-cards',
  templateUrl: 'filtrar-cards.html',
})
export class FiltrarCardsPage {

  cards: any[] = [];
  titulo: string;
  tipo = '1';

  modeKeys = [
    'comida',
    'deporte',
    'escuela',
    'trabajo',
    'chismes'
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams,public events: Events,private viewCtrl: ViewController) {
    this.cards = this.navParams.get('cards');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FiltrarCardsPage');
  }

  //Filtro las cards por una palabra . si la contiene en el titulo o estado de animo o commentario , entonces es aceptado
  filtrarCards() {
    let retosFiltrado = this.cards.filter((card)=>{
      if(this.titulo){
          return (card.title.includes(this.titulo)||card.title === this.titulo||
                   card.state.includes(this.titulo)||card.state === this.titulo||
                   card.comm.includes(this.titulo)||card.comm === this.titulo)
      }
        else {
            return card.ctg === this.tipo;
        }
      });
      if(retosFiltrado.length>0){
        retosFiltrado = retosFiltrado.concat(this.cards);
          retosFiltrado=this.removeDuplicity(retosFiltrado);
      }
      else{
        console.log("estoy aqui ! no he encontrado nada !");
      }
  
    this.events.publish('challenges:filtered', retosFiltrado);
    this.cerrar();
    
  }
  //Quita los valores del filtro
  quitarFiltro() {
    this.events.publish('challenges:filtered', []);
    this.cerrar();
  }
  //Cierra esta parte de iniciar filtro
  cerrar() {
    this.viewCtrl.dismiss();
  }
    //remueve los duplicados en un array a traves de su clave
   removeDuplicity(datas){
    return datas.filter((item, index,arr)=>{
    const c = arr.map(item=> item.key);
    return  index === c.indexOf(item.key)
  })
}
  
}
