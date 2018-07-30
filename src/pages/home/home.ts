import { Component, ViewChild } from '@angular/core';
import { NavParams } from 'ionic-angular';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
    
})
export class HomePage {

  isLoggedIn: boolean ;
  user: any;
  constructor(public navParams: NavParams) {
    this.isLoggedIn=true;
    this.user = navParams.get("usuario");
  }
  
}
