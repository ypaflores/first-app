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
import { NotesProvider } from '../../providers/notes/notes';
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

  lang: string = 'es';
  translation: any;
  myForm: FormGroup;
  user: Observable<firebase.User>;
  scopes: string[];
  isLoggedIn: boolean;
  user2= {id:"",first_name:"",email:""};
  public loading:Loading;

  constructor(private serviceN:NotesProvider,public events: Events,public navCtrl: NavController,public formBuilder: FormBuilder,public afAuth: AngularFireAuth, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,private facebook: Facebook,public platform: Platform,public menu: MenuController,private storage: Storage,private utilities: UtilitiesProvider,private translateService: TranslateService) 
    {
      this.menu.swipeEnable(false);
    this.myForm = formBuilder.group({
      'email': ['', Validators.compose([Validators.required])],
        'password': ['', Validators.compose([Validators.required])]
    });

  }
  //cuenta con fireBase
  login(){

   console.log(this.myForm.value.email + " "+  this.myForm.value.password)
    this.afAuth.auth.signInWithEmailAndPassword(this.myForm.value.email, this.myForm.value.password)
    .then((res)=>
        {
            if (res.operationType == 'signIn') {
              this.serviceN.getUserInfFirebase(res.user.uid).then((res)=>{
                this.storage.set('usuario', res).then(() => {
                  this.utilities.saveLang(this.lang).then(() => {
                    this.navCtrl.setRoot(HomePage).then(() => {
                      this.events.publish('user:logged');
                    })
                  })
                })
              });
          }
      },error => {
            this.utilities.showAlert(this.translation.ERROR.TITULO, error.message);
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
  
 registroFacebook() {
  this.facebook.login(['public_profile', 'user_friends', 'email']).then(res => {
    if (res.status === 'connected') {
      // mostramos el loading
      this.utilities.showLoading('Cargando...').then(() => {
        // obtenemos más info del perfil de Facebook
        this.utilities.getFacebookInfo(res).then(response => {
            // quitamos el loading
            this.utilities.dismissLoading().then(() => {
                  this.utilities.saveLang(this.lang).then(() => {
                    this.navCtrl.setRoot(HomePage, {
                      usuario: response,
                    }).then(() => {
                      this.events.publish('user:logged');
                    })
                  })
            })
        }).catch(error => {
          this.utilities.showAlert(this.translation.ERROR.FACEBOOK.TITULO, this.translation.ERROR.FACEBOOK.DESC);
        })
      })
    }
    else {
      this.utilities.showAlert(this.translation.ERROR.FACEBOOK.TITULO, this.translation.ERROR.FACEBOOK.DESC);
    }
  }).catch(error => {
    if (error.errorCode != 4201) {
      this.utilities.showAlert(this.translation.ERROR.FACEBOOK.TITULO, this.translation.ERROR.FACEBOOK.DESC);
    }
  })
}

public logoutFromFacebook(){
this.facebook.logout().then( (response) => {
    console.log("Logged out: ", response);
    this.isLoggedIn = false
  }).catch((error) => {
    console.log('Error logout from Facebook', error)}
    );
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
        this.lang=lang;
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
}

facebookLogin(): Promise<any> {
  return this.facebook.login(['email'])
    .then( response => {
      const facebookCredential = firebase.auth.FacebookAuthProvider
        .credential(response.authResponse.accessToken);

      firebase.auth().signInWithCredential(facebookCredential)
        .then( success => { // modificar aver come se puede hacer....
          var userId = this.afAuth.auth.currentUser.uid;
            this.user2.first_name= success.displayName;
            this.user2.id=  success.uid;
            this.user2.email= success.email;
            this.serviceN.writeUserData(userId,success.displayName, success.email,"",success.photoURL);
          this.storage.set('usuario', this.user2).then(() => {
          this.utilities.saveLang(this.lang).then(() => {
            this.navCtrl.setRoot(HomePage).then(() => {
              this.events.publish('user:logged');
            })
          })
        })
        });
    }).catch((error) => { console.log(error) });
}
}

