import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceCenterProvider } from '../../providers/service-center/service-center';
import { UtilitiesProvider } from '../../providers/utilities/utilities';
import { TranslateService } from '@ngx-translate/core';
/**
 * Generated class for the TranslatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-translate',
  templateUrl: 'translate.html',
})
export class TranslatePage {

  data;
	errorMsg;
	sourceText: string;
	translatedText: string;
	sourceLanguageCode: string;
	targetLanguageCode: string;
  languages = [];
  translation: any;
  lang: string;

  constructor(public navCtrl: NavController,private translationservice :ServiceCenterProvider,private utilities:UtilitiesProvider,private translateService: TranslateService) {
    this.languages =  this.translationservice.getLanguages();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TranslatePage');
  }
  translate() {
			let sourceText = this.sourceText;
			let targetLanguageCode = this.targetLanguageCode;
      if(targetLanguageCode){
          this.translationservice.translate2({tmp:sourceText},targetLanguageCode).then((res)=>{
            console.log(res);
            this.data = res;
            this.translatedText = this.data.tmp; 
          }, error => {
            this.errorMsg = error;
    
            this.utilities.showAlert("Error",this.errorMsg);
          });
      }
      else {
        this.utilities.showAlert("Error",this.translation.IDIOMA);
      }
	};

	clearTextBtn() {
		this.sourceText = '';
    this.translatedText = '';
    this.targetLanguageCode='';
	}



	chooseLanguageBtn(){
        console.log(this.targetLanguageCode);
				if (this.sourceText) {
          //this.translate();
          this.translate();
        } 
       
      }
      obtenerTraduccion() {
    
        setTimeout(() => {
          this.translateService.get('TRADUCTOR.ERROR').subscribe(result => {
            this.utilities.getLang().then(lang => {
              this.lang = lang;
              this.translation = result;
            });
          });
        }, 100);
      }
      
		
}
