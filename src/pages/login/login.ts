import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, LoadingController, Loading, Platform, Events } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators}  from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app'
import { Observable } from '../../../node_modules/rxjs/Observable';
import { Facebook } from "@ionic-native/facebook";
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { UtilitiesProvider } from '../../providers/utilities/utilities';
import { TranslateService } from '../../../node_modules/@ngx-translate/core';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  lang: string = 'it';
  translation: any;
  myForm: FormGroup;
  user: Observable<firebase.User>;
  scopes: string[];
  isLoggedIn: boolean;
  user2: any;
  public loading:Loading;

  constructor( public events: Events,public navCtrl: NavController,public formBuilder: FormBuilder,public afAuth: AngularFireAuth, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,private facebook: Facebook,public platform: Platform,public menu: MenuController,private storage: Storage,private utilities: UtilitiesProvider,private translateService: TranslateService) 
    {
      this.menu.swipeEnable(false);
    this.myForm = formBuilder.group({
      'email': ['', Validators.compose([Validators.required])],
        'password': ['', Validators.compose([Validators.required])]
    });
  
    this.user = afAuth.authState;
    this.scopes = ['public_profile', 'user_friends', 'email'];
    this.isLoggedIn = false;
    //preparare la piattaforma
    platform.ready().then((readySource) => {
      console.log("Platform ready from", readySource);
      // More info on login status at: https://developers.facebook.com/docs/reference/javascript/FB.getLoginStatus
      facebook.getLoginStatus().then(response => {
            console.log("Status: ", response.status);
          if(response.status === "connect") {
            console.log("User logged in and has authenticated the app: ", response);
          this.isLoggedIn = true;
        }
         else {
          console.log("User logged in to Facebook but has not authenticated the app OR user isn't logged into Facebook", response);
           this.isLoggedIn = false;
          }
      }).catch((error) => console.log(error));
      });

  }
  //cuenta con fireBase
  login(){

   console.log(this.myForm.value.email + " "+  this.myForm.value.password)
    this.afAuth.auth.signInWithEmailAndPassword(this.myForm.value.email, this.myForm.value.password)
    .then((res)=>
        {
            if (res.operationType == 'signIn') {
              this.utilities.saveLang(this.lang).then(() => {
                this.navCtrl.setRoot(HomePage).then(() => {
                  this.events.publish('user:logged');
                })
              })
          }
          else {
            this.utilities.showToast("Usuario No reconocido , Registrese Porfavor");
            this.loading.dismiss();
          }
      },error => {
        
          //this.isLogging = false;
          this.utilities.showAlert(this.translation.ERROR.TITULO, this.translation.ERROR.DESC);
          this.loading.dismiss();
       }
      );
        
        this.loading = this.loadingCtrl.create({
          content:"Procesando Datos",
          dismissOnPageChange: true,
        });
        this.loading.present();
  }

  goToSignup(){
    
    this.navCtrl.push('SignupPage');
  }

  goToResetPassword(){
    this.navCtrl.push('ResetPassword');
  }

 
 //cuenta con facebook
  
 public loginWithFacebook(){
  this.facebook.login(this.scopes).then(response => {
    if(response.status === "connected") {
      console.log("Logged in succesfully");
    this.getUserDetail(response.authResponse.userID);
    this.isLoggedIn = true;
    this.navCtrl.push(HomePage, {
      usuario: this.user2,
    })
  } 
 else {
  console.log("Not logged in :(");
  this.isLoggedIn = false;
    }
  }).catch((error) => console.log('Error logging into Facebook', error));
  /*this.navCtrl.push(HomePage, {
    usuario: "giovany",
  })*/
}

public logoutFromFacebook(){
this.facebook.logout().then( (response) => {
    console.log("Logged out: ", response);
    this.isLoggedIn = false
  }).catch((error) => {
    console.log('Error logout from Facebook', error)}
    );
}

getUserDetail(userId) {
this.facebook.api("/" + userId +"/?fields=id,email,name,picture,gender",["public_profile"]).then((detail) => {
  console.log("User detail: ", detail);
  this.user2 = detail;
  }).catch((error) => {
    console.log(error);
  });
}

ionViewDidLoad() {
  setTimeout(() => {
    this.establecerIdioma().then(() => {
      this.translateService.get('INICIAR_SESION.VARIOS').subscribe(translation => {
        this.translation = translation;
      })
    })
  }, 100)
}

 establecerIdioma() {
  return new Promise((resolve, reject) => {
    this.utilities.getLang().then(lang => {
      this.translateService.use(lang).subscribe(() => {
        resolve();
      })
    }).catch(error => {
      this.translateService.use('es').subscribe(() => {
        resolve();
      })
    })
  })
}
cambiarIdioma(lang) {
  this.lang = lang;
  this.translateService.use(lang);
  this.ionViewDidLoad();
}

}