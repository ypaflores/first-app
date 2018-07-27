import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

/**
 * Generated class for the FirstRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-first-request',
  templateUrl: 'first-request.html',
})
export class FirstRequestPage {
  
  myInput : string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController,public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FirstRequestPage');
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  onCancel(event)
  {
    if(this.myInput==""||this.myInput.length==0)
        this.presentAlert();
    else 
    this.presentLoadingDefault();
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Falta de informacion',
      subTitle: 'Por favor introduzca algun dato para iniciar la busqueda',
      buttons: ['Reprueba']
    });
    alert.present();
  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Buscandoo..'
    });
  
    loading.present();
  
   /*setTimeout(() => {
      loading.dismiss();
    }, 5000);*/
  }
  

}
