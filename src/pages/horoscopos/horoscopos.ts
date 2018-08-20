import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, } from 'ionic-angular';
import { HoroscopeRequestProvider } from '../../providers/horoscope-request/horoscope-request';
import { ServiceCenterProvider } from '../../providers/service-center/service-center';
import { TranslateService } from '@ngx-translate/core';

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

  slides ;

  constructor(private service: HoroscopeRequestProvider, public loadingCtrl: LoadingController,private translateService :ServiceCenterProvider,private translate: TranslateService) {
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
      content: "Cargando Datos!"
    });
    loader.present().then(()=> {
      this.service.consultAllHoroscopo(this.day).then((response)=>{
        if(response){
          console.log(response);
          this.slides = response;
          setTimeout(() => {
            loader.dismiss();
          }, 4500);
        }
      })
    })
  }
  
  public translateObjects(){

    let loader = this.loadingCtrl.create({
      content: "Traduciendo Datos!"
    });
    loader.present().then(()=> {
      this.translateService.translate(this.slides).then((response)=>{
        if(response){
          console.log(response);
          this.slides = response;
          if(response)loader.dismiss();
        }
      })
    })
  }
}


