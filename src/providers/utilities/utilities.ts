import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, ToastController, AlertController, Loading } from "ionic-angular";

/*
  Generated class for the UtilitiesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilitiesProvider {

  private loading: Loading;
  
  constructor(private storage: Storage,public platform: Platform,private toastCtrl: ToastController,private alertCtrl: AlertController) {
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
}
