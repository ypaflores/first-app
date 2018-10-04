import { Http,Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import Trs from 'translate-json-object';


/*
  Generated class for the ServiceCenterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceCenterProvider {

  
  public name: string;
  
  constructor(public traducir :Trs) {

      traducir.init({
        yandexApiKey: 'trnsl.1.1.20180816T115006Z.2777cdd56e559d34.3dd05c12ee3f71d172ac48dcb5e519cade86c5f5',
      });

    }
    //Traduce los objetos en lengua espanol!
    translate(example:any) {
        return new Promise((resolve, reject) => {
          this.traducir.translate(example, 'es').then(userData => {
              resolve(userData);
            }).catch(error => {
              reject(JSON.stringify(error));
            })
          })
   }




}
