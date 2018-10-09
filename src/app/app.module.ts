import { MbscModule } from '@mobiscroll/angular';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Platform } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SQLite } from '@ionic-native/sqlite';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { ServiceCenterProvider } from '../providers/service-center/service-center';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Camera } from '@ionic-native/camera';
import { FormsModule } from '../../node_modules/@angular/forms';
import { TabNewPage } from '../pages/tab-new/tab-new';
import { Facebook } from "@ionic-native/facebook";
import { NotesProvider } from '../providers/notes/notes'; 
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { OperationsProvider } from '../providers/operations/operations';
import { HoroscopeRequestProvider } from '../providers/horoscope-request/horoscope-request';
import { HoroscoposPage } from '../pages/horoscopos/horoscopos';
import Trs from 'translate-json-object';
import { UtilitiesProvider } from '../providers/utilities/utilities';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicStorageModule } from '@ionic/storage';
import { FileTransfer } from '@ionic-native/file-transfer';
import { NoticiasGeneralesPage } from '../pages/noticias-generales/noticias-generales';
import { NgxCarousel3dModule }  from 'ngx-carousel-3d';
import { Contacts } from '@ionic-native/contacts';
import { ContactosPage } from '../pages/contactos/contactos';
import { CreaContactoPageModule } from '../pages/crea-contacto/crea-contacto.module';
import { FolderModalPage } from './../pages/folder-modal/folder-modal';
import { File } from '@ionic-native/file';
import { Diagnostic } from '@ionic-native/diagnostic';
import { ApiProvider } from '../providers/api/api';
import { CalendarPage } from '../pages/calendar/calendar';
import { CalendarModule } from 'ionic3-calendar-en';
import { FileOpener } from '@ionic-native/file-opener';
import { Base64 } from '@ionic-native/base64';
import { TranslatePage } from '../pages/translate/translate';
import { SignaturePage } from '../pages/signature/signature';
import { SignaturePadModule } from 'angular2-signaturepad';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    TabNewPage,
    ContactosPage,
    NoticiasGeneralesPage,
    HoroscoposPage,
    LoginPage,
    FolderModalPage,CalendarPage,TranslatePage,SignaturePage,
  ],
  imports: [
    CalendarModule,
    MbscModule,
    HttpModule,
    BrowserModule,
    NgxCarousel3dModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule ,
    FormsModule,SignaturePadModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }, useDefaultLang: true
    }),
    IonicStorageModule.forRoot(),
    CreaContactoPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabNewPage,
    NoticiasGeneralesPage,
    HoroscoposPage,
    LoginPage,
    ContactosPage,
    FolderModalPage,CalendarPage,TranslatePage ,SignaturePage
  ],
  providers: [
    File, //Añadimos el plugin
    Diagnostic, //Añadimos el plugin
    StatusBar,
    SplashScreen,
    ServiceCenterProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    Facebook,
    NotesProvider,
    OperationsProvider,
    HoroscopeRequestProvider,
    Trs,
    FileTransfer ,
    UtilitiesProvider,
    SQLite,
    Contacts,ApiProvider,File,
    FileOpener,Base64
  ]
})


export class AppModule {}
