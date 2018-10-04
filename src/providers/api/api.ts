import { Injectable } from '@angular/core';
import { RequestOptions, Http, Headers, URLSearchParams } from '@angular/http';
import { FileTransferObject, FileUploadOptions, FileTransfer } from '@ionic-native/file-transfer';
import { TranslateService } from '@ngx-translate/core';
import { UtilitiesProvider } from '../utilities/utilities';
import { API_URL, APIKEY_PUBLIC, APIKEY_PRI } from '../constants';
import {Md5} from 'ts-md5/dist/md5';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  //marvel
  private url = API_URL;
  private publicKey = APIKEY_PUBLIC;
  private privateKey = APIKEY_PRI;
  private timestamp = new Date().getTime();
  private hash = Md5.hashStr(this.timestamp+this.privateKey+this.publicKey).toString();
  private finalUrl = '';
  constructor(public http: Http,private utilities: UtilitiesProvider, private transfer: FileTransfer, private translateService: TranslateService) {
    
  }

//regreso los comics , offset es opcional .!
getComics2(offset ?: number) {
  let urlComics = this.url+'/comics'+'?apikey='+this.publicKey+'&ts='+this.timestamp+'&hash='+this.hash;
  if(offset != undefined){
          this.finalUrl = urlComics+'&offset='+offset;
          console.log(offset);
      }else{
          this.finalUrl = urlComics;
      }
  return this.http.get(this.finalUrl).toPromise().then(res => res.json())
}
//Recojo los detalles de algo
getDetails2(id) {
  return this.http.get(this.url+'/'+id, {
      params: {
        ts: this.timestamp,
        apikey: this.publicKey,
        hash: this.hash
      }}).toPromise().then(res => res.json())
}
//Recojo los comics filtrados por nombre
searchComicByName(word: string, offset ? : number, limit?:boolean){
  let urlComics = this.url+'/comics'+'?apikey='+this.publicKey+'&ts='+this.timestamp+'&hash='+this.hash;
      if(offset != undefined){
          this.finalUrl = urlComics +'&titleStartsWith='+word+'&offset='+offset;
      }else if(limit){
          this.finalUrl = urlComics +'&titleStartsWith='+word+'&limit=5';
      }else{
          this.finalUrl = urlComics +'&titleStartsWith='+word;
      }
      return this.http.get(this.finalUrl).toPromise().then(res => res.json())
}
//Recojo los comics filtrados por aNo
searchComicsByYear(year: number, offset ? : number, limit?:boolean){
  let urlComics = this.url+'/comics'+'?apikey='+this.publicKey+'&ts='+this.timestamp+'&hash='+this.hash;
      if(offset != undefined){
          this.finalUrl = urlComics+'&startYear='+year+'&offset='+offset;
      }else if(limit){
          this.finalUrl = urlComics+'&startYear='+year+'&limit=5';
      }else{
          this.finalUrl = urlComics+'&startYear='+year;
      }
      return this.http.get(this.finalUrl).toPromise().then(res => res.json())
}
//Recojo los personajes , offset es opcional.
getCharacters2(offset ?: number) {
  let urlCharacters = this.url+'/characters'+'?apikey='+this.publicKey+'&ts='+this.timestamp+'&hash='+this.hash;
  if(offset != undefined){
          this.finalUrl = urlCharacters+'&offset='+offset;
          console.log(offset);
      }else{
          this.finalUrl = urlCharacters ;
      }
  return this.http.get(this.finalUrl).toPromise().then(res => res.json())
}
//recojo los personajes , filtrados por nombre
searchCharcterByName(word: string, offset ? : number, limit?:boolean){
  let urlComics = this.url+'/characters'+'?apikey='+this.publicKey+'&ts='+this.timestamp+'&hash='+this.hash;
      if(offset != undefined){
          this.finalUrl = urlComics +'&nameStartsWith='+word+'&offset='+offset;
      }else if(limit){
          this.finalUrl = urlComics +'&nameStartsWith='+word+'&limit=5';
      }else{
          this.finalUrl = urlComics +'&nameStartsWith='+word;
      }
      return this.http.get(this.finalUrl).toPromise().then(res => res.json())
}
}
