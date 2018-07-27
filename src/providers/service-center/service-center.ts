import { Http,Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { NewResponse } from '../FirstResponse';

/*
  Generated class for the ServiceCenterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceCenterProvider {

  
  public name: string;
  
  constructor(public http: Http) {

    }
    private extractData(res: Response) {
      console.log(res.json());
      let body = res.json();
            return body;
        }
    private handleErrorPromise (error: Response | any) {
	    console.error(error.message || error);
	    return Promise.reject(error.message || error);
  }
        
  search():Promise<NewResponse>
  { 
      return this.http.get('https://jsonplaceholder.typicode.com/posts/7')
      .toPromise()
      .then(this.extractData)
	    .catch(this.handleErrorPromise);
 } 
/*
 search2() {
  let promise = new Promise((resolve, reject) => {
    let apiURL ="https://jsonplaceholder.typicode.com/posts/1";
    this.http.get(apiURL)
      .toPromise()
      .then(
        res => { // Success
          console.log(res.json());
          resolve();
        }
      );
  });
  return promise;
}

getAutentication( user, pass):boolean
{
  if()
  return false;

}*/
}
