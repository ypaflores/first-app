import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, ToastController, AlertController, Loading,LoadingController } from "ionic-angular";
import { FacebookLoginResponse, Facebook } from '@ionic-native/facebook';

/*
  Generated class for the UtilitiesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilitiesProvider {

  private loading: Loading;
  
  constructor(private storage: Storage,public platform: Platform,private toastCtrl: ToastController,private alertCtrl: AlertController,private fb :Facebook,private loadingCtrl:LoadingController) {
    console.log('Hello UtilitiesProvider Provider');
  }

  getLang(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.storage.get('lang').then(lang => {
        if(lang) {
          resolve(lang);
        }
        else {
          reject('No se ha encontrado el código de idioma');
        }
      }).catch(error => {
        reject(error);
      })
    })
  }
  saveLang(lang: string) {
    return new Promise((resolve, reject) => {
      this.storage.set('lang', lang).then(() => {
        resolve();
      }).catch(error => {
        reject(error);
      })
    })
  }
  /**
   * Muestra un toast genérico para notificar algo (un error, éxito, etc)
   * @param message Mensaje del toast
   * @param cssClass Clase CSS a aplicar (opcional)
   */
  showToast(message: string, cssClass?: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 5000,
      closeButtonText: 'OK',
      showCloseButton: true,
      cssClass: cssClass ? cssClass : ''
    });

    toast.present();
  }

  /**
   * Muestra un alert genérico para notificar algo (un error, éxito, etc)
   * @param title Título del alert
   * @param message Mensaje del alert
   */
  showAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: ['OK']
    });

    alert.present();
  }
  getPlatform() {
    return this.platform.is('ios') ? 'ios' : 'android';
  }
  getFileName(path: string) {
    return path.split('/').pop();
  }
  getFacebookInfo(response: FacebookLoginResponse): Promise<any> {
    return new Promise((resolve, reject) => {
      this.fb.api(response.authResponse.userID + '/?fields=id,email,first_name', ['public_profile']).then(response => {
        resolve(response);
      }).catch(error => {
        reject('Error al obtener los datos de Facebook: ' + error);
      })
    })
  }/*
  getUserDetail(userId) {
    this.facebook.api("/" + userId +"/?fields=id,email,name,picture,gender",["public_profile"]).then((detail) => {
      console.log("User detail: ", detail);
      this.user2 = detail;
      }).catch((error) => {
        console.log(error);
      });
    }*/
  /**
   * Muestra loading
   * @param message Mensaje del loading (opcional)
   */
  showLoading(message?: string, duration?: number) {
    this.loading = this.loadingCtrl.create({
      content: message ? message : null,
      duration: duration ? duration : null
    });
    return this.loading.present();
  }

  /**
   * Quita el loading cargado
   */
  dismissLoading() {
    return this.loading.dismiss();
  }
   /**
   * Obtiene los datos del usuario guardados en el storage
   */
  getUserData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.ready().then(() => {
        this.storage.get('usuario').then(userData => {
          resolve(userData);
        }).catch(error => {
          reject(JSON.stringify(error));
        })
      }).catch(error => {
        reject(JSON.stringify(error));
      })
    })
  }
  closeSession(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.ready().then(() => {
        this.storage.remove('usuario').then(() => {
          resolve();
        }).catch(error => {
          reject('Error al borrar datos de sesión');
        })
      }).catch(error => {
        reject('Error al obtener tus datos');
      })
    })
  }
}
