import { Http,Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import Trs from 'translate-json-object';
import { Observable } from 'rxjs';


/*
  Generated class for the ServiceCenterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceCenterProvider {

  
  public name: string;
  data: string;
  errorMsg: string ;
  sourceWord: string;
  translatedLanguageCode: string;
  languages = [];
  
  constructor(public traducir :Trs,private http: Http) {

      traducir.init({
        yandexApiKey: 'trnsl.1.1.20180816T115006Z.2777cdd56e559d34.3dd05c12ee3f71d172ac48dcb5e519cade86c5f5',
      });
      this.http = http;

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

   translateText(sourceText, targetLanguageCode) {

    return this.http.get("https://www.googleapis.com/language/translate/v2?key=AIzaSyCYKfY7VkpL2pv02i8DEhk6YNTlEQbcNsI&target=" + targetLanguageCode + "&q=" + sourceText)
      .map(response => {
        this.data = response.json().data.translations[0];
        return this.data;
      }).catch(this.handleError);

  }

  private handleError(error: any) {
    this.errorMsg = (error.message) ? error.message :
      error.status ? `${error.status}   -  ${error.statusText} ` : 'Server error';
    return Observable.throw(this.errorMsg);
  }

  translate2(example:any,target:string) {
    return new Promise((resolve, reject) => {
      this.traducir.translate(example,target).then(userData => {
          resolve(userData);
        }).catch(error => {
          reject(JSON.stringify(error));
        })
      })
}
  getLanguages() {

    return this.languages = [
      {
        languageCode: 'ar',
        languageName: 'Arabic'
      },
      {
        languageCode: 'eu',
        languageName: 'Basque'
      },
      {
        languageCode: 'bg',
        languageName: 'Bulgarian'
      },
      {
        languageCode: 'ca',
        languageName: 'Catalan'
      },
      {
        languageCode: 'zh-CN',
        languageName: 'Chinese'
      },
      {
        languageCode: 'hr',
        languageName: 'Croatian'
      },
      {
        languageCode: 'cs',
        languageName: 'Czech'
      },
      {
        languageCode: 'da',
        languageName: 'Danish'
      },
      {
        languageCode: 'nl',
        languageName: 'Dutch'
      },
      {
        languageCode: 'en',
        languageName: 'English'
      },
      {
        languageCode: 'es',
        languageName: 'Español'
      },
      {
        languageCode: 'et',
        languageName: 'Estonian'
      },
      {
        languageCode: 'fi',
        languageName: 'Finish'
      },
      {
        languageCode: 'fr',
        languageName: 'French'
      },
      {
        languageCode: 'de',
        languageName: 'German'
      },
      {
        languageCode: 'iw',
        languageName: 'Hebrew'
      },
      {
        languageCode: 'hi',
        languageName: 'Hindi'
      },
      {
        languageCode: 'hu',
        languageName: 'Hungarian'
      },
      {
        languageCode: 'is',
        languageName: 'Icelandic'
      },
      {
        languageCode: 'id',
        languageName: 'Indonesian'
      },
      {
        languageCode: 'it',
        languageName: 'Italian'
      },
      {
        languageCode: 'ga',
        languageName: 'Irish'
      },
      {
        languageCode: 'ja',
        languageName: 'Japanese'
      },
      {
        languageCode: 'ko',
        languageName: 'Korean'
      },
      {
        languageCode: 'lv',
        languageName: 'Latvian'
      },
      {
        languageCode: 'lt',
        languageName: 'Lithuanian'
      },
      {
        languageCode: 'no',
        languageName: 'Norwegian'
      },
      {
        languageCode: 'fa',
        languageName: 'Persian'
      },
      {
        languageCode: 'pl',
        languageName: 'Polish'
      },
      {
        languageCode: 'pt',
        languageName: 'Portuguese'
      },
      {
        languageCode: 'ro',
        languageName: 'Romanian'
      },
      {
        languageCode: 'ru',
        languageName: 'Russian'
      },
      {
        languageCode: 'sr',
        languageName: 'Serbian'
      },
      {
        languageCode: 'sk',
        languageName: 'Slovak'
      },
      {
        languageCode: 'sl',
        languageName: 'Slovenian'
      },
      {
        languageCode: 'sv',
        languageName: 'Swedish'
      },
      {
        languageCode: 'th',
        languageName: 'Thai'
      },
      {
        languageCode: 'tr',
        languageName: 'Turkish'
      },
      {
        languageCode: 'uk',
        languageName: 'Ukrainian'
      },
      {
        languageCode: 'cy',
        languageName: 'Welsh'
      },
      {
        languageCode: 'zu',
        languageName: 'Zulu'
      }

    ];

  }


}
