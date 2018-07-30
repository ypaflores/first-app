import { Injectable } from '@angular/core';
import { Platform } from "ionic-angular";
import { NavController } from 'ionic-angular';
import { Facebook } from "@ionic-native/facebook";
 
@Injectable()
export class AccessFbProvider {
  scopes: string[];
  isLoggedIn: boolean;
  user: any;

    constructor(private facebook: Facebook,public platform: Platform,public navCtrl: NavController) {
      this.scopes = ['public_profile', 'user_friends', 'email'];
      this.isLoggedIn = false;

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

public loginWithFacebook(){
    this.facebook.login(this.scopes).then(response => {
      if(response.status === "connected") {
        console.log("Logged in succesfully");
      this.getUserDetail(response.authResponse.userID);
      this.isLoggedIn = true;
    } 
   else {
    console.log("Not logged in :(");
    this.isLoggedIn = false;
      }
    }).catch((error) => console.log('Error logging into Facebook', error));
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
    this.user = detail;
    }).catch((error) => {
      console.log(error);
    });
  }

}

