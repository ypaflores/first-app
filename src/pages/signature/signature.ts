import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {SignaturePad} from 'angular2-signaturepad/signature-pad';
import { HomePage } from '../home/home';
/**
 * Generated class for the SignaturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signature',
  templateUrl: 'signature.html',
})
export class SignaturePage {

  @ViewChild(SignaturePad) public signaturePad : SignaturePad;

  public signaturePadOptions : Object = {
    'minWidth': 1,
    'canvasWidth': 340,
    'canvasHeight': 200
  };
  public signatureImage : string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignaturePage');
  }
  drawCancel() {
    this.dismiss({estado:false});
  }

   drawComplete() {
    this.signatureImage = this.signaturePad.toDataURL();
    this.dismiss({estado:true,image:this.signatureImage});
  }

  drawClear() {
    this.signaturePad.clear();
  }
  canvasResize() {
    let canvas = document.querySelector('canvas');
    this.signaturePad.set('minWidth', 1);
    this.signaturePad.set('canvasWidth', canvas.offsetWidth);
    this.signaturePad.set('canvasHeight', canvas.offsetHeight);
  }

  ngAfterViewInit() {
        this.signaturePad.clear();
        this.canvasResize();
  }
  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

}


