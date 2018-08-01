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
import { FirstRequestPage } from '../pages/first-request/first-request';

//import { FirebaseConfig } from '@ionic-native/firebase-config';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Camera } from '@ionic-native/camera';
import { FormsModule } from '../../node_modules/@angular/forms';
import { SearchPage } from '../pages/search/search';
import { TabNewPage } from '../pages/tab-new/tab-new';
import { Facebook } from "@ionic-native/facebook";
import { NotesProvider } from '../providers/notes/notes'; 


export const firebaseConfig = {
  apiKey: "xxxxxxxxxx",
  authDomain: "your-domain-name.firebaseapp.com",
  databaseURL: "https://your-domain-name.firebaseio.com",
  storageBucket: "your-domain-name.appspot.com",
  messagingSenderId: '<your-messaging-sender-id>'
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    FirstRequestPage,
    SearchPage,
    TabNewPage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    FormsModule,
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    FirstRequestPage,
    SearchPage,
    TabNewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ServiceCenterProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    Facebook,
    NotesProvider
  ]
})


export class AppModule {}
