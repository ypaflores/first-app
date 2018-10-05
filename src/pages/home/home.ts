import { Component, ViewChild } from '@angular/core';
import { NavParams, normalizeURL, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilitiesProvider } from '../../providers/utilities/utilities';
import { Events } from 'ionic-angular';
import { NotesProvider } from '../../providers/notes/notes';
import { Storage } from '@ionic/storage';

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
  nameFile : string;
  constructor(private noteListService: NotesProvider,private alertCtrl: AlertController,private storage: Storage,private events: Events,private utilities: UtilitiesProvider,public navParams: NavParams,private formBuilder: FormBuilder,private translateService: TranslateService) {
   
    //Recoje los datos del usuario
    this.utilities.getUserData().then(userData => {
    if(userData) {
      console.log(userData);
      
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
  /*
  subirImgPerfilNueva() {
    this.utilities.showLoading().then(() => {
      if (this.imgPerfilNueva) {
          var namePhoto = this.generateUUID();
          this.noteListService.uploadPhoto(this.imgPerfilNueva,namePhoto).then(()=>{
          this.utilities.dismissLoading().then((result) => {
            console.log('en el then de uploadNewProfileImg');
            console.log(result);
            if(result){
              this.storage.ready().then(() => {
                this.user.image = {name:namePhoto,url:result};
                this.storage.set('usuario', this.user).then(() => {
                  this.imgPerfilNueva = null;
                  this.utilities.showToast(result);
                })
              })
            }
            else {
              this.utilities.showAlert("","");
            }
        }).catch(error => {
          console.log('en el catch de uploadNewProfileImg');

          this.utilities.dismissLoading().then(() => {
            this.utilities.showAlert('Error al subir imagen', error);
          })
        })
      });
    }
      else {
        this.utilities.dismissLoading().then(() => {
          this.utilities.showAlert('Sin imagen', 'No se ha seleccionado una imagen de perfil nueva');
        })
      }
    })
  }

  borrarImgPerfil() {
    let alert = this.alertCtrl.create({
      title: this.translation.IMAGEN_PERFIL.BORRAR.TITULO,
      message: this.translation.IMAGEN_PERFIL.BORRAR.TEXTO,
      buttons: [
        {
          text: this.lang == 'es' ? 'Cancelar' : 'Cancel',
          role: 'cancel'
        },
        {
          text: this.lang == 'es' ? 'Borrar imagen' : 'Delete image',
          handler: () => {
            this.utilities.showLoading().then(() => {
              this.noteListService.deletePhoto(this.user.image.name).then(result => {
                console.log('en el deletePhoto');
                console.log(result);

                this.utilities.dismissLoading().then(() => {
                  if (result.type == 'ok') {
                    this.storage.ready().then(() => {
                      this.user.image.name ='';
                      this.user.image.url='';
                      this.storage.set('usuario', this.user).then(() => {
                        this.imgPerfilNueva = null;
                        this.utilities.showToast(result.message);
                      })
                    })
                  }
                  else {
                    this.utilities.showAlert(result.title, result.message);
                  }
                })
              }).catch(error => {
                console.log('en el catch de api.deleteProfileImg');

                this.utilities.dismissLoading().then(() => {
                  this.utilities.showAlert('Error al borrar imagen', error);
                })
              })
            })
          }
        }
      ]
    });
    alert.present();
  }*/
  private generateUUID(): any {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  pruebasSubir(){
    var photo  = 'data:image/png;base64,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';
    this.nameFile = this.generateUUID();
    console.log({photo:photo,nombre:this.nameFile});
    
    this.noteListService.uploadPhoto(photo,this.nameFile).then((res)=>{
      console.log(res);
      
    });
  }
  pruebasBorrar(){
    this.noteListService.deletePhoto(this.nameFile).then((res)=>{
      console.log("hecho! "+res);
      
    });
}
}
