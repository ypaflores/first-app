import { Component } from '@angular/core';
import { IonicPage, LoadingController, } from 'ionic-angular';
import { HoroscopeRequestProvider } from '../../providers/horoscope-request/horoscope-request';
import { ServiceCenterProvider } from '../../providers/service-center/service-center';
import { TranslateService } from '@ngx-translate/core';
import { UtilitiesProvider } from '../../providers/utilities/utilities';

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
  guardados:any;
  mainSelected: string = 'horoscopo';
  mainCategories = [
    { id: 1, icon: 'newspaper', page: 'horoscopo', name: 'Horoscopo' },
    { id: 2, icon: 'folder', page: 'folder_hor', name: 'Folder H' }
 ];
  settings: any = {
    theme: 'material'
}
guardado=false;
  constructor(private service: HoroscopeRequestProvider, public loadingCtrl: LoadingController,private translateService :ServiceCenterProvider,private translate: TranslateService,private utilities:UtilitiesProvider) {
    this.date=  this.dtmp.toLocaleDateString();
  }
  
  //Hace una llamada ala funcion local , antes de ver el contenido de todo
  ngOnInit() { 
    
    this.consult();
  
  }
  //Cambia el dia del cual quisiera saber el horoscopo y llama a consult () -> principal es este
    onSelectChange() {
      this.aggiornaData();
      this.consult(); 
    }

    selectMain(page) {
      this.mainSelected = page;
    }
    //Dia cambiado , date , y todo para verlo en el html
    aggiornaData()
    {
      let app=0;
      if(this.day=="tomorrow")app=1;
      else if(this.day=="yesterday")app=-1;
      let tomorrow = new Date(this.dtmp);
      tomorrow.setDate(this.dtmp.getDate()+app);
      this.date=tomorrow.toLocaleDateString();
    }

    

  //Llama a una funcion del provider y recoje las peticiones rest , 
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
  
  //Hace traducciones de objetos !
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


