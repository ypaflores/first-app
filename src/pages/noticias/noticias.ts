import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, PopoverController, Events} from 'ionic-angular';
import { ServiceCenterProvider } from '../../providers/service-center/service-center';
import 'rxjs/add/operator/toPromise';
import { NotesProvider } from '../../providers/notes/notes';
import { Card } from '../../model/card.model';
import 'rxjs/Rx';
import 'rxjs/add/operator/map'
import { TranslateService } from '@ngx-translate/core';
import { UtilitiesProvider } from '../../providers/utilities/utilities';
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
  translation: any;
  lang: string;
  lista :Card[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public service : ServiceCenterProvider,private serviceN:NotesProvider,
    public loadingCtrl: LoadingController,private popoverCtrl: PopoverController,public events: Events,private translateService: TranslateService,private utilities: UtilitiesProvider){
    
  }

  ngOnInit(){

    this.initializeCards("Cargando Datoss...");

 }
  private initializeCards(comment:string){

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

  public goToAddNews(){
    
    this.navCtrl.push('InsertNoticiaPage');
  }

  public deleteElement(card:Card){
      this.serviceN.removeNote(card).then(()=>{
        this.initializeCards("Eliminando objeto seleccionado");
        this.utilities.showToast(this.translation.NOTICIA_BORRADA);
      });
  }
  public goToUpdate(card:Card){
    
    this.navCtrl.push("InsertNoticiaPage", {
      element: card,
    });

  
}
   
  public doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  public filtrarCards($event) {
    
    const popover = this.popoverCtrl.create('FiltrarCardsPage', { cards: this.lista });
    popover.present({
      ev: $event
    });
    
  } 
  
  public ionViewDidLoad() {
    this.obtenerTraduccion();
    this.events.subscribe('challenges:filtered', (retosFiltrados) => {
      if(retosFiltrados.length>0)
        this.lista = retosFiltrados;
    })
  }

  obtenerTraduccion() {
    
    setTimeout(() => {
      this.translateService.get('MIS_NOTICIAS').subscribe(result => {
        this.utilities.getLang().then(lang => {
          this.lang = lang;
          this.translation = result;
        });
      });
    }, 100);
  }
  
}
