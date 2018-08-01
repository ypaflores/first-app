import { Component, ViewChild } from '@angular/core';
import { NavParams } from 'ionic-angular';
//import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
    
})
export class HomePage {

  isLoggedIn: boolean ;
  user: any;
  slides = [
    {
      title: "Bienvenido Giovany !",
      description: "The <b>Ionic Component Documentation</b> showcases a number of useful components that are included out of the box with Ionic.",
      image: "https://ionicframework.com/dist/preview-app/www/assets/img/ica-slidebox-img-1.png",
    },
    {
      title: "What is Ionic?",
      description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
      image: "https://ionicframework.com/dist/preview-app/www/assets/img/ica-slidebox-img-2.png",
    },
    {
      title: "What is Ionic Cloud?",
      description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
      image: "https://ionicframework.com/dist/preview-app/www/assets/img/ica-slidebox-img-3.png",
    }
  ];

  constructor(public navParams: NavParams) {
    this.isLoggedIn=true;
    this.user = navParams.get("usuario");
  }
  
 
}
