import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HoroscopeRequestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HoroscopeRequestProvider {

  constructor(public http: Http) {
    console.log('Hello HoroscopeRequestProvider Provider');
  }


  getZodiacalSunsign(sunsign) 
  {
    let tmp = "http://theastrologer-api.herokuapp.com/api/horoscope/"+sunsign+"/today";
    
    return this.http.get(tmp).toPromise().then(res => res.json());

  }

}
