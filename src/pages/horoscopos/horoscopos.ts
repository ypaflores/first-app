import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HoroscopeRequestProvider } from '../../providers/horoscope-request/horoscope-request';

/**
 * Generated class for the HoroscoposPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-horoscopos',
  templateUrl: 'horoscopos.html',
})
export class HoroscoposPage {
  flag=false;

 signs = ["aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio"
    , "sagittarius", "capricorn", "aquarius", "pisces"];


  dati={"aries" : {},"taurus":{},"germini":{},"cancer":{},"leo":{},"virgo":{},"libra":{},
        "scorpio":{},"sagittarius":{},"capricorn":{},"aquarius":{},"pisces":{}
      };

  constructor(private service: HoroscopeRequestProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HoroscoposPage');
  }

  private  muestraHoroscopo(signo) {
    
    this.service.getZodiacalSunsign(signo).then(json => {
      this.dati[signo]=json;
    })
  
    }

    public consultAllHoroscopo()
    {
      
      this.signs.forEach(element => {
        this.muestraHoroscopo(element);
        
      });
     this.flag = true;
    }

    
}
