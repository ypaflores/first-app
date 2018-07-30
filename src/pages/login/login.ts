import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, LoadingController, Loading, Platform } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators, AbstractControl}  from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app'
import { Observable } from '../../../node_modules/rxjs/Observable';
import { Facebook } from "@ionic-native/facebook";
import { HomePage } from '../home/home';
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

  myForm: FormGroup;
  user: Observable<firebase.User>;
  public loading:Loading;
  scopes: string[];
  isLoggedIn: boolean;
  user2: any;

  constructor(public navCtrl: NavController,public formBuilder: FormBuilder,public afAuth: AngularFireAuth, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,private facebook: Facebook,public platform: Platform) 
    {
    
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

    console.log("Email:" + this.myForm.value.email);
    console.log("Password:" + this.myForm.value.password);
   

    this.afAuth.auth.createUserWithEmailAndPassword(this.myForm.value.email, this.myForm.value.password)
    .then(
      res => {
        this.navCtrl.setRoot('HomePage');
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({
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


}
