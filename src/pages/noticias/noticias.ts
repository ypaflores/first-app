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
  id_User="";
  constructor(public navCtrl: NavController, public navParams: NavParams,public service : ServiceCenterProvider,private serviceN:NotesProvider,
    public loadingCtrl: LoadingController,private popoverCtrl: PopoverController,public events: Events,private translateService: TranslateService,private utilities: UtilitiesProvider){
    
      this.utilities.getUserData().then(user=>{
      this.id_User=user.id;
    })
  }

  //recojo las noticias que son mias .
  ngOnInit(){

    this.initializeCards("Cargando Datoss...");

 }
  //hay un loader para que cargue mientras , puedo cambiarlo a como de lampeggiare per un po.
  private initializeCards(comment:string){

    let loader = this.loadingCtrl.create({
      content: comment
    });
    loader.present().then(()=> {
      this.serviceN.getNoteList(this.id_User).subscribe(res => {
        this.lista = res;
        if(res)loader.dismiss();
      });
    })
  }
  //Me manda a una pagina en el cual hay un formulario para ingresar una nueva noticia
  public goToAddNews(){
    
    this.navCtrl.push('InsertNoticiaPage');
  }
  //Puedo remover la noticia seleccionada.
  public deleteElement(card:Card){
      this.serviceN.removeNote(card).then(()=>{
        this.initializeCards("Eliminando objeto seleccionado");
        this.utilities.showToast(this.translation.NOTICIA_BORRADA);
      });
  }

  //Puedo cambiar algunos valores de la noticia y guardar los cambios , exactamente esta funcion me manda al mismo
  //formulario de nueva noticia
  public goToUpdate(card:Card){
    
    this.navCtrl.push("InsertNoticiaPage", {
      element: card,
    });

  
}
  //Refresh la pagina **agregar mas llamadas a funciones

  public doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  //filtro para algunas busquedas por nombre o tipo por ejemplo . me manda a otro controler y regresa una lista a partir
  //de un aviso mediante un popover event
  public filtrarCards($event) {
    
    const popover = this.popoverCtrl.create('FiltrarCardsPage', { cards: this.lista });
    popover.present({
      ev: $event
    });
    
  } 
  //se obtienen las traducciones oficiales della pagina correspondente para los toast (mensajes app) adecuados
  public ionViewDidLoad() {
    this.obtenerTraduccion();
    this.events.subscribe('challenges:filtered', (retosFiltrados) => {
      if(retosFiltrados.length>0)
        this.lista = retosFiltrados;
    })
  }
  //regresan las traducciones bien hechas
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
