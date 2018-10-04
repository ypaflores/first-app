import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { CreaContactoPage } from '../crea-contacto/crea-contacto';
import { MbscFormOptions, MbscListviewOptions, mobiscroll } from '@mobiscroll/angular';
import { UtilitiesProvider } from '../../providers/utilities/utilities';
import { NotesProvider } from '../../providers/notes/notes';
import { TranslateService } from '@ngx-translate/core';
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
  formSettings: MbscFormOptions = {
    theme: 'material'
    }

  mainSelected: string = 'rubrica';
  mainCategories = [
    { id: 1, icon: 'book', page: 'rubrica', name: 'Rubrica' },
    { id: 2, icon: 'folder', page: 'folder_rub', name: 'Folder R' }
 ];
  settings: any = {
    theme: 'material'
}


  lang: string;
  translation: any;
  guardado=false;
  contactos:any[];
 
  listaContactos:any[]=[];
  avatar:string="https://api.adorable.io/avatars/285/"; // importante 
  shownGroup = null;

  constructor(private translateService: TranslateService,public navCtrl: NavController, private modalCtrl:ModalController,private contacts:Contacts,private utilities: UtilitiesProvider,private servR:NotesProvider) {
    this.cargarListaContactos();
  }
  //Accede a la rubrica del telefoono y recupera los contactos de ahy 
  cargarListaContactos(){
    this.contacts.find(["*"])
    .then(res => {
      console.log({funcion:'CargarListaContactos',res:res})
      let datosMostar:any[]=[];
      res.map((item) =>{
        if(item.displayName != null && item.phoneNumbers != null){
          datosMostar.push({id:item.id,displayName:item.displayName,photos:[{value:this.avatar+item.displayName}],phoneNumbers:item.phoneNumbers,birthday:item.birthday,emails:item.emails})
        }        
      })
      console.log({funcion:'CargarListaContactos',datosMostar:datosMostar})
      this.listaContactos = datosMostar;
    },error => {
      console.log({error:error})
    })
  }

  selectMain(page) {
    this.mainSelected = page;
  }
  
  //Crea un modal  con un formulario para ingresar un nuevo contacto
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
  //Regresa los contactos guardados en firebase
  getRubricaSaved(){
    this.servR.getRubrica().subscribe((rub)=>{
        console.log(rub);
        this.contactos = rub;
    });
  }
  //Elimina algun contacto que se habia sido guardado en firebase
  removeContact(contact:any){
    this.servR.removeContact(contact);
    this.utilities.showToast(this.translation.REMOVIDO);
  }
  //Comprueba si ya existe un contacto similar . por un md5 (combinacion de nombre y ID)
  noExistContact(contact:any){
      return new Promise((resolve, reject) => {
        this.servR.getContactSaved(contact.md5).subscribe((res)=>{
          resolve((res.length==0)?true:false);   
      });
    })
  }
  //Agrega un nuevo contacto si esque no existe 
  addContact(contact:any){
    this.noExistContact(contact).then((res)=>{
        if(res){
          this.utilities.showToast(this.translation.AGREGADO);
          this.servR.addContactList(contact);
        }
        else{
          this.utilities.showAlert("Error",this.translation.EXISTENTE);
        }
    })  
     
  }
  pruebas(){
    //this.addContact({id:"10",md5:"1234567",dislplayName:"ypa"});
  }
  //Cards collapse 
  toggleGroup(group) {
    if (this.isGroupShown(group)) {
        this.shownGroup = null;
    } else {
        this.shownGroup = group;
    }
};
isGroupShown(group) {
    return this.shownGroup === group;
}
  //Obtiene las traducciones adecuadas a para los mensajes de exitos /erroneos
obtenerTraduccion() {
  setTimeout(() => {
    this.translateService.get('RUBRICA.ERRORES/SUCESOS').subscribe(result => {
      this.utilities.getLang().then(lang => {
        this.lang = lang;
        this.translation = result;
      });
    });
  }, 100);
}
ionViewDidLoad() {
  this.obtenerTraduccion();
}
}
