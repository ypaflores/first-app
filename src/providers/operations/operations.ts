import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from '../../../node_modules/firebase';

/*
  Generated class for the OperationsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OperationsProvider {

  storageRef : any ;
  imagesRef : any ;

  constructor() {
    this.storageRef = firebase.storage().ref();
    this.imagesRef = this.storageRef.child('imags');
  }
  getDateFormat()
    {
      var date = new Date();
        var options = {
          weekday: "long", year: "numeric", month: "short",
          day: "numeric", hour: "2-digit", minute: "2-digit"
        };
        return ""+date.toLocaleTimeString("en-us", options);
    }

}

