import { Injectable } from '@angular/core';
import { RequestOptions, Http, Headers, URLSearchParams } from '@angular/http';
import { FileTransferObject, FileUploadOptions, FileTransfer } from '@ionic-native/file-transfer';
import { TranslateService } from '@ngx-translate/core';
import { API_URL } from '../constants';
import { UtilitiesProvider } from '../utilities/utilities';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  private headers: Headers;
  private options: RequestOptions;
  private apiUrl = API_URL;
  private apiKey = 'AIzaSyAlwmBWJHcKCZViBU5hpSPBk0DVcDZ-NZ4';

  constructor(public http: Http,private utilities: UtilitiesProvider, private transfer: FileTransfer, private translateService: TranslateService) {
    this.headers = new Headers({
      'X-API-KEY': this.apiKey
    });
    this.options = new RequestOptions({ headers: this.headers });
  }


  /**
   * Inicia sesión en el sistema
   * @param params Usuario y contraseña
   */
  login(params: { user: string, password: string, lang: string }) {
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('apiMethod', 'login');
    urlSearchParams.append('user', params.user);
    urlSearchParams.append('password', params.password);
    urlSearchParams.append('lang', params.lang)
    return this.http.post(this.apiUrl, urlSearchParams,this.options).toPromise().then(response => response = response.json());
  }

}
