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
  dtmp = new Date();
  date:string;
  day="today";

 signs = ["aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio"
    , "sagittarius", "capricorn", "aquarius", "pisces"];

      slides = [
        {sing : {},image:"http://cdn.thestorypedia.com/images/2016/05/aries.jpg"},
        {sing : {},image:"http://cdn.thestorypedia.com/images/2016/05/taurus.jpg"},
        {sing : {},image:"http://cdn.thestorypedia.com/images/2016/05/gemini.jpg"},
        {sing : {},image:"http://cdn.thestorypedia.com/images/2016/05/cancer.jpg"},
        {sing : {},image:"http://cdn.thestorypedia.com/images/2016/05/leo.jpg"},
        {sing : {},image:"http://cdn.thestorypedia.com/images/2016/05/virgo.jpg"},
        {sing : {},image:"http://cdn.thestorypedia.com/images/2016/05/libra.jpg"},
        {sing : {},image:"http://cdn.thestorypedia.com/images/2016/05/scorpio.jpg"},
        {sing : {},image:"http://cdn.thestorypedia.com/images/2016/05/sagitario.jpg"},
        {sing : {},image:"http://cdn.thestorypedia.com/images/2016/05/capricorn.jpg"},
        {sing : {},image:"http://cdn.thestorypedia.com/images/2016/05/aquarius.jpg"},
        {sing : {},image:"http://cdn.thestorypedia.com/images/2016/05/pisces.jpg"},
        
      ];

  constructor(private service: HoroscopeRequestProvider) {
    this.date=  this.dtmp.toLocaleDateString();
  }

  ngOnInit() { 
    
    this.consultAllHoroscopo()
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HoroscoposPage');
  }

  private  muestraHoroscopo(signo,count) {
    
    this.service.getZodiacalSunsign(signo,this.day).then(json => {
      this.slides[count].sing = json;
    })
  
    }

    public consultAllHoroscopo()
    {
      let count = -1;
      this.signs.forEach(element => {
        this.muestraHoroscopo(element,++count);
        
      });
     this.flag = true;
     console.log(this.slides);
    }

    onSelectChange() {
      this.aggiornaData();
      this.consultAllHoroscopo();
    }

    aggiornaData()
    {
      let app=0;
      if(this.day=="tomorrow")app=1;
      else if(this.day=="yesterday")app=-1;
      let tomorrow = new Date(this.dtmp);
      tomorrow.setDate(this.dtmp.getDate()+app);
      this.date=tomorrow.toLocaleDateString();
    }
}
