import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, } from 'ionic-angular';
import { HoroscopeRequestProvider } from '../../providers/horoscope-request/horoscope-request';

/**
 * Generated class for the HoroscoposPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-horoscopos',
  templateUrl: 'horoscopos.html',
})
export class HoroscoposPage {
  flag=false;
  dtmp = new Date();
  date:string;
  day="today";

  slides = [];

  constructor(private service: HoroscopeRequestProvider, public loadingCtrl: LoadingController) {
    this.date=  this.dtmp.toLocaleDateString();
  }

  ngOnInit() { 
    
    this.consult();
  
  }

    onSelectChange() {
      this.aggiornaData();
      this.consult(); 
    }

    aggiornaData()
    {
      let app=0;
      if(this.day=="tomorrow")app=1;
      else if(this.day=="yesterday")app=-1;
      let tomorrow = new Date(this.dtmp);
      tomorrow.setDate(this.dtmp.getDate()+app);
      this.date=tomorrow.toLocaleDateString();
    }

    

  public consult(){
    let loader = this.loadingCtrl.create({
      content: 'Cargando Datos...'
    });
    loader.present().then((x)=> {
      this.slides = this.service.consultAllHoroscopo(this.day);
      setTimeout(() => {
        loader.dismiss();
      }, 4500);
    })
    
  }
  
}
