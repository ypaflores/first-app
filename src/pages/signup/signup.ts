import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { TranslateService } from '@ngx-translate/core';
import { UtilitiesProvider } from '../../providers/utilities/utilities';
import { NotesProvider } from '../../providers/notes/notes';
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
  lang: string = 'es';
  
  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder,private serviceN:NotesProvider,
    public afAuth: AngularFireAuth, 
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,private translateService: TranslateService,private utilities: UtilitiesProvider) {

      this.myForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
        username:['', Validators.required]
      });
  }
  //recojo la lang actual.
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
    setTimeout(() => {
      this.lang = this.translateService.currentLang;
    }, 100);
  }

  //Registracion en firebase a partir de email valida y password.
  signup(){

    console.log("Email:" + this.myForm.value.email);
    console.log("Password:" + this.myForm.value.password);
    this.afAuth.auth.createUserWithEmailAndPassword(this.myForm.value.email, this.myForm.value.password)
    .then(
      res => {
        var userId = this.afAuth.auth.currentUser.uid;
        this.serviceN.writeUserData(userId,this.myForm.value.username, this.myForm.value.email, this.myForm.value.password,"");
        this.utilities.showAlert("En hora buena","Registrado con exito!");
        this.loading.dismiss().then(()=>{
          this.navCtrl.pop();
        });
      }, error => {
        this.loading.dismiss().then( () => {
          this.utilities.showAlert('Error al registrarse', "La dirección de correo electrónico ya está siendo utilizada por otra cuenta!");
          
        });
      });

      this.loading = this.loadingCtrl.create({
        content:"Procesando Datos",
        dismissOnPageChange: true,
      });
      this.loading.present();
    
  }
}
