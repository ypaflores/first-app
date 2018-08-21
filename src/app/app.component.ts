import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, MenuController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';import { LoginPage } from '../pages/login/login';
import { NoticiasPage } from '../pages/noticias/noticias';
import { SearchPage } from '../pages/search/search';
import { TabNewPage } from '../pages/tab-new/tab-new';
import { HoroscoposPage } from '../pages/horoscopos/horoscopos';
import { AngularFireAuth } from 'angularfire2/auth';
import { TranslateService } from '../../node_modules/@ngx-translate/core';
import { UtilitiesProvider } from '../providers/utilities/utilities';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  lang: string;
  translation: any;
  
  pages: Array<{title: string, component: any,icon : string}>;

  constructor(public afAuth: AngularFireAuth,private menuCtrl: MenuController,private alertCtrl: AlertController,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,private translate: TranslateService,private utilities:UtilitiesProvider,private events: Events) {
    this.initializeApp();

  }
 
  setPages(){

    this.utilities.getLang().then(result => {
      console.log(result);
      this.lang= result;
      this.translate.use(this.lang).subscribe(() => {
        this.translate.get('MENU').subscribe(menu => {
          this.translation = menu;
          this.pages = [
            { title: this.translation.INICIO,  component: HomePage  ,icon: 'person' },
            { title: this.translation.HOROSCOPO,component: HoroscoposPage ,icon: 'people'},
            { title: this.translation.BUSCAR,  component: SearchPage ,icon: 'add' },
            { title: this.translation.NOTICIAS, component: TabNewPage,  icon: 'list' }
            
          ];
        })
      })
    }).catch((error) => {
      this.lang="es";
      this.translate.use(this.lang).subscribe(() => {
        this.translate.get('MENU').subscribe(menu => {
          this.translation = menu;
          this.pages = [
            { title: this.translation.INICIO,  component: HomePage  ,icon: 'person' },
            { title: this.translation.HOROSCOPO,component: HoroscoposPage ,icon: 'people'},
            { title: this.translation.BUSCAR,  component: SearchPage ,icon: 'add' },
            { title: this.translation.NOTICIAS, component: TabNewPage,  icon: 'list' }
            
          ];
        })
      })
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.listenEvents();
      this.translate.setDefaultLang('es');
      this.setPages();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  cerrarSesion() {
    let alert = this.alertCtrl.create({
      title: this.translation.CERRAR_SESION.TITULO,
      message: this.translation.CERRAR_SESION.DESC,
      buttons: [
        {
          text: this.translation.CERRAR_SESION.CANCELAR,
          role: 'cancel'
        },
        {
          text:this.translation.CERRAR_SESION.TITULO,
          handler: () => {
            this.menuCtrl.close().then(() => {
              this.afAuth.auth.signOut().then(()=>{
                this.nav.setRoot(LoginPage).then(() => {
                  console.log(this.translation.CERRAR_SESION.EXITO);
                })
              });
            })
         }
        }
      ]
    });
    alert.present();
  }
  listenEvents() {
    this.events.subscribe('user:logged', () => {
          this.setPages();
        });
    this.events.subscribe('lang:changed', () => {
      this.setPages();
    })
  }
}
