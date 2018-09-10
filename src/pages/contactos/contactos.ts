import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { CreaContactoPage } from '../crea-contacto/crea-contacto';

/**
 * Generated class for the ContactosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contactos',
  templateUrl: 'contactos.html',
})
export class ContactosPage {
  hideMedia=false;
  listaContactos:any[]=[];
  clicked=false;
  color_stop="carousel-go";
  avatar:string="./assets/icon/avatar.png";
  @ViewChild('carousel') carousel:any;
  movies : Object[] = []
  slides : Array<Object> = []
  options : Object = {
    clicking: true,
    sourceProp: 'src',
    visible: 2,
    perspective: 0,
    startSlide: 0,
    border: 2,
    dir: 'ltr',
    width: 180,
    height: 150,
    space: 80,
    autoRotationSpeed: 5000,
    loop: true
}

  constructor(public navCtrl: NavController, private modalCtrl:ModalController,private contacts:Contacts) {
    //this.cargarListaContactos();

    this.slides = [{"tipo":"image","url":"https://www.lasprovincias.es/el_correo/noticias/201703/31/media/cortadas/prueba-01-ketF-U2131796188083t-575x323@El%20Correo.jpg"},
                  {"tipo":"image","url":"https://cdn.pixabay.com/photo/2015/03/12/12/43/test-670091_960_720.png"},
                  {"tipo":"image","url":"http://gestionpyme.com/wp-content/uploads/2013/09/El-periodo-de-prueba-en-la-empresa.jpg"},
                  {"tipo":"video","url":""}
                ];
  }
  /**
   * Funcion encargada de cargar la lista de contactos del celular, en mi caso filtrare y mostrare solo
   * los objetos que tienen valor en los campos dislplayName, photos, phoneNumbers. Con estos cargare
   * la lista a mostrar.
   */
  cargarListaContactos(){
    this.contacts.find(["*"])
    .then(res => {
      console.log({funcion:'CargarListaContactos',res:res})
      let datosMostar:any[]=[];
      res.map((item) =>{
        if(item.displayName != null && item.photos != null && item.phoneNumbers != null){
          datosMostar.push({displayName:item.displayName,photos:[{value:this.avatar}],phoneNumbers:item.phoneNumbers})
        }        
      })
      console.log({funcion:'CargarListaContactos',datosMostar:datosMostar})
      this.listaContactos = datosMostar;
    },error => {
      console.log({error:error})
    })
  }

  recojeContactosGuardados(){
      //recojerlos y meterlos con los actuales..  y mostrarlos antes que pida algo mas
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactosPage');
  }
 
  slideClicked (index) {
    if(this.clicked){
      this.clicked=false;
      this.color_stop="carousel-go";
      this.carousel.goNext();
    }
    else{
      this.carousel.slideClicked(index);
      this.clicked=true;
      this.color_stop="carousel-stop";
    }  
    
   }
   toggleHideMedia() {
    this.hideMedia = !this.hideMedia;
    if (!this.hideMedia) {
      //this.scrollToBottom();
    }
  }

  modalNuevoContacto(){
    let modal = this.modalCtrl.create(CreaContactoPage);
    modal.onDidDismiss(data => {
      console.log({dataOnDidDismiss:data});
      if(data.estado){
        console.log(data)
        this.listaContactos.push({displayName:data.contacto.displayName,photos:[{value:this.avatar}],phoneNumbers:data.contacto.phoneNumbers});
      }
    });
    modal.present();
  }
}
