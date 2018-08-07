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
  date= "2018-08-07";
  slides = [
    {
      
      title: "Taurus !",
      description: "<b>Horoscope: </b> Don't be surprised if you feel a little antsy today. You have more energy than usual, both physically and mentally. You're curious about anything that seems remotely interesting! You can see how this could detract from your usual ability to focus. Now you're paying attention to this, that and the other thing, all at the same time. You may learn something interesting, but absorbing it deeply is another matter.",
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
