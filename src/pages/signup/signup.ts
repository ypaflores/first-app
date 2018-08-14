import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  myForm: FormGroup;
  public loading:Loading;
  
  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public afAuth: AngularFireAuth, 
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {

      this.myForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }


  signup(){

    console.log("Email:" + this.myForm.value.email);
    console.log("Password:" + this.myForm.value.password);
   

    this.afAuth.auth.createUserWithEmailAndPassword(this.myForm.value.email, this.myForm.value.password)
    .then(
      res => {
        this.createAlert("Registrado con suceso!");
        this.loading.dismiss().then(()=>{
          this.navCtrl.pop();
        });
      }, error => {
        this.loading.dismiss().then( () => {
          this.createAlert("La dirección de correo electrónico ya está siendo utilizada por otra cuenta!");
        });
      });

      this.loading = this.loadingCtrl.create({
        content:"Procesando Datos",
        dismissOnPageChange: true,
      });
      this.loading.present();
    
  }

  createAlert(msg){
    let alert = this.alertCtrl.create({
      message: msg,
      buttons: [
        {
          text: "Ok",
          role: 'cancel'
        }
      ]
    });
    alert.present();
  }
}
