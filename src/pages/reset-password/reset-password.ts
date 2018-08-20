import { Component } from '@angular/core';
import { IonicPage,NavController,AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the ResetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'ResetPassword'
})

@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {

  lang: string = 'es';
  myForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public afAuth: AngularFireAuth,
    public nav: NavController,
    public alertCtrl: AlertController,
    private translateService: TranslateService
  ) {
    this.myForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
    setTimeout(() => {
      this.lang = this.translateService.currentLang;
    }, 100);
  }

  resetPassword(){
    console.log("Email:" + this.myForm.value.email);
    
    this.afAuth.auth.sendPasswordResetEmail(this.myForm.value.email)
    .then((user) => {
      let alert = this.alertCtrl.create({
        message: "Te enviamos un link a tu correo.",
        buttons: [
          {
            text: "Ok",
            role: 'cancel',
            handler: () => {
              this.nav.pop();
            }
          }
        ]
      });
      alert.present();
    }, (error) => {
      var errorMessage: string = error.message;
      let errorAlert = this.alertCtrl.create({
        message: errorMessage,
        buttons: [
          {
            text: "Ok",
            role: 'cancel'
          }
        ]
      });
      errorAlert.present();
    });
  }
}
