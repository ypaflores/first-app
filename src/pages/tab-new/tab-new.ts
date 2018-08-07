import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the TabNewPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab-new',
  templateUrl: 'tab-new.html'
})
export class TabNewPage {

  newsRoot = 'NoticiasPage'
  addNewRoot = 'InsertNoticiaPage'



  constructor(public navCtrl: NavController) {}

}
