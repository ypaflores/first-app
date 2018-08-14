import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';import { LoginPage } from '../pages/login/login';
import { NoticiasPage } from '../pages/noticias/noticias';
import { SearchPage } from '../pages/search/search';
import { TabNewPage } from '../pages/tab-new/tab-new';
import { HoroscoposPage } from '../pages/horoscopos/horoscopos';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  
  pages: Array<{title: string, component: any,icon : string}>;

  constructor(public afAuth: AngularFireAuth,private menuCtrl: MenuController,private alertCtrl: AlertController,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage  ,icon: 'person'},
      { title: 'Horoscopo', component: HoroscoposPage ,icon: 'people'},
      { title: 'Buscar2', component: SearchPage ,icon: 'add' },
      { title: 'News', component: TabNewPage,  icon: 'list'}
      
      
      
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  cerrarSesion() {
    let alert = this.alertCtrl.create({
      title: "Cerrar Sesion!",
      message: "Estas seguro de Cerrar Sesion ?",
      buttons: [
        {
          text: "Cancelar",
          role: 'cancel'
        },
        {
          text: "Cerrar Sesion!",
          handler: () => {
            this.menuCtrl.close().then(() => {
              this.afAuth.auth.signOut().then(()=>{
                this.nav.setRoot(LoginPage).then(() => {
                  console.log("Cerrando Session");
                })
              });
            })
         }
        }
      ]
    });
    alert.present();
  }
}
