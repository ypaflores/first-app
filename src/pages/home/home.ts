import { Component, ViewChild } from '@angular/core';
import { NavParams, normalizeURL } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilitiesProvider } from '../../providers/utilities/utilities';
import { Events } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { NotesProvider } from '../../providers/notes/notes';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
    
})
export class HomePage {

  imgPerfilNueva: string;
  isLoggedIn: boolean =false;
  user: any;
  date= "2018-08-07";
  day="today";
  lang: string;
  translation: any;
  formMiPerfil: FormGroup;

  constructor( private events: Events,private utilities: UtilitiesProvider,public navParams: NavParams,private formBuilder: FormBuilder,private translateService: TranslateService,private api:ApiProvider,private service:NotesProvider) {
   
    //Recoje los datos del usuario
    this.utilities.getUserData().then(userData => {
    if(userData) {
      this.user=userData;
      this.isLoggedIn=true;
      this.formMiPerfil = this.formBuilder.group({
        nombre: [userData.username, Validators.required],
        email: [userData.email, Validators.required],
        usuario: [userData.id, Validators.required],
      })
    }
  })

  }
  ionViewDidLoad() {
    this.obtenerTraduccion();
  }
  //Obtiene la traduccion adecuada
  obtenerTraduccion() {
    setTimeout(() => {
      this.translateService.get('MI_PERFIL').subscribe(result => {
        this.utilities.getLang().then(lang => {
          this.lang = lang;
          this.translation = result;
        });
      });
    }, 100);
  }

  //Cambia el idioma i avisa a todos atraves del events.publish
  cambiarIdioma(lang) {
    this.lang = lang;
    this.utilities.saveLang(this.lang).then(() => {
      this.translateService.use(lang).subscribe(() => {
        this.events.publish('lang:changed');
        this.obtenerTraduccion();
      })
    })
  }

  //Modificar datos actuales
  submitForm() {
    this.utilities.showAlert("Rellenar esta funcion que funcione bien!","");
  }

  //Completar y hacer debug mediante movil .

  obtenerImgPerfilNueva() {/*
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth: 1920,
      targetHeight: 1080,
      allowEdit: false
    }

    this.camera.getPicture(options).then(urlFoto => {
      if (this.utilities.getPlatform() === 'ios') {
        this.imgPerfilNueva = normalizeURL(urlFoto);
      }
      else {
        this.imgPerfilNueva = urlFoto.substring(0, urlFoto.indexOf('?'))
      }

      console.log('mi imgPerfilNueva = ');
      console.log(this.imgPerfilNueva);

    }).catch(error => {
      let alert = this.alertCtrl.create({
        title: 'Error',
        message: 'Error al obtener la imagen: ' + error,
        buttons: ['OK']
      });

      alert.present();
    })*/
  }

  subirImgPerfilNueva() {
    //asignImgUser(userId,img)
    this.utilities.showAlert('subir imagen', 'rellenar typescript para subir imagen');
  }

  borrarImgPerfil() {
    this.utilities.showAlert('borrar imagen', 'rellenar typescript para eliminar imagen');
  }

}
