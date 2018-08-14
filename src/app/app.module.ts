import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { ServiceCenterProvider } from '../providers/service-center/service-center';

//import { FirebaseConfig } from '@ionic-native/firebase-config';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Camera } from '@ionic-native/camera';
import { FormsModule } from '../../node_modules/@angular/forms';
import { SearchPage } from '../pages/search/search';
import { TabNewPage } from '../pages/tab-new/tab-new';
import { Facebook } from "@ionic-native/facebook";
import { NotesProvider } from '../providers/notes/notes'; 
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { InsertNoticiaPage } from '../pages/insert-noticia/insert-noticia';
import { OperationsProvider } from '../providers/operations/operations';
import { HoroscopeRequestProvider } from '../providers/horoscope-request/horoscope-request';
import { HoroscoposPage } from '../pages/horoscopos/horoscopos';

export const firebaseConfig = {
  apiKey: "AIzaSyAH2Sh-cpOV5IS4d7fvAsvg_cuB4X8HAB4",
  authDomain: "firstappfirebase-94b87.firebaseapp.com",
  databaseURL: "https://firstappfirebase-94b87.firebaseio.com",
  storageBucket: "firstappfirebase-94b87.appspot.com",
  messagingSenderId: "634066334725"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SearchPage,
    TabNewPage,
    HoroscoposPage,
    LoginPage   
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule ,
    FormsModule,
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SearchPage,
    TabNewPage,
    HoroscoposPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ServiceCenterProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    Facebook,
    NotesProvider,
    OperationsProvider,
    HoroscopeRequestProvider
  ]
})


export class AppModule {}
