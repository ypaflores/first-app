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
  day="today";
  slides = [
    {
      sing : {date: "2018-08-09",
           horoscope: "The past was a rockin' good time. You're not so su…ere's a lot more to this song than meets the ear.", 
            meta: {intensity: "84%", keywords: "out of your depth, actual values", mood: "back office decision"}, 
            sunsign: "Aries"},
      image:"http://cdn.thestorypedia.com/images/2016/05/aries.jpg",
    },
    
  ];

  constructor(public navParams: NavParams) {
    this.isLoggedIn=true;
    this.user = navParams.get("usuario");
  }

  onSelectChange() {
    //change data !
    //call rest api
    console.log('S', this.day);
  }
 
  obtenerTraduccion(){
    
    console.log("estoy traduciendo!");/*
    translate('Yo quiero jugar en la playa', {to: 'en'}).then(res => {
      console.log(res.text);
      //=> I speak English
      console.log(res.from.language.iso);
      //=> nl
      }).catch(err => {
      console.error(err);
  });*/
  }
}
