import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/*
  Generated class for the HoroscopeRequestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HoroscopeRequestProvider {

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


  constructor(private http: Http) {
    console.log('Hello HoroscopeRequestProvider Provider');
  }


  getZodiacalSunsign(sunsign,day) 
  {
    let tmp = "http://theastrologer-api.herokuapp.com/api/horoscope/"+sunsign+"/"+day;
    
    return this.http.get(tmp).toPromise().then(res => res.json());

  }

  private  muestraHoroscopo(signo,count,day) {
    
    this.getZodiacalSunsign(signo,day).then(json => {
      
      this.slides[count].sing = json;
    })
  
    }

    public consultAllHoroscopo(day:string)
    {
      let count = -1;
      this.signs.forEach(element => {
        this.muestraHoroscopo(element,++count,day);
        
      });
       return new Promise((resolve, reject) => {
           resolve(this.slides);
        })
    }



    
}
