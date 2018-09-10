import { Injectable } from '@angular/core';
import { RequestOptions, Http, Headers, URLSearchParams } from '@angular/http';
import { FileTransferObject, FileUploadOptions, FileTransfer } from '@ionic-native/file-transfer';
import { TranslateService } from '@ngx-translate/core';
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

  constructor(public http: Http,private utilities: UtilitiesProvider, private transfer: FileTransfer, private translateService: TranslateService) {
    
  }


  /**
   * Inicia sesión en el sistema
   * @param params Usuario y contraseña
   */
  login(params: { user: string, password: string, lang: string }) {/*
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('apiMethod', 'login');
    urlSearchParams.append('user', params.user);
    urlSearchParams.append('password', params.password);
    urlSearchParams.append('lang', params.lang)
    return this.http.post(this.apiUrl, urlSearchParams,this.options).toPromise().then(response => response = response.json());
  */
  }

}
