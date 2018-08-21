import { Component, ViewChild } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions,  } from '@angular/http';
import { TranslateService } from '@ngx-translate/core';

import { ServiceCenterProvider } from '../../providers/service-center/service-center';
import { ApiProvider } from '../../providers/api/api';

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
  
  constructor(public navParams: NavParams,public translateService :ServiceCenterProvider, private translate: TranslateService,private api : ApiProvider ) {
    this.isLoggedIn=true;
    this.user = navParams.get("usuario");
    

  }

  onSelectChange() {
    //change data !
    //call rest api
    console.log('S', this.day);
  }
 
  obtenerTraduccion(){
    
    let example = {
      "name": "Please enter your name and surname",
      "list": ["translate", "object", "made", "easy"],
      "nested": {
        "hello": "hello",
        "world": "world"
        }
    };
    
    let tmp;

    this.translateService.translate(example).then((response)=>{
      if(response){
        console.log(response);
        tmp = response;
      }
    })

  

  }

  pruebaPhp(){
    /*
    this.api.login({user: "studente.giovany.flores@gmail.com",
                    password: "123456",
                    lang: "es"}).then((res)=>{
                      console.log(res);
                      
                    });*/
  }

}
