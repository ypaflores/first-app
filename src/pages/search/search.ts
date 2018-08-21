import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OperationsProvider } from '../../providers/operations/operations';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  modeKeys:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public store : OperationsProvider) {
    this.initializeItems();
  }

  initializeItems() {
    this.modeKeys = [
      'Amsterdam',
      'Bogota',
      'Pistoia',
      'Florence'
    ];
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  getItems(ev: any) {

    this.initializeItems();    
    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.modeKeys = this.modeKeys.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
