import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreaContactoPage } from './crea-contacto';
import { Contacts } from '@ionic-native/contacts';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CreaContactoPage,
  ],
  imports: [
    IonicPageModule.forChild(CreaContactoPage),TranslateModule.forChild()
  ],
  exports: [
    CreaContactoPage
  ],
  providers:[Contacts]
})
export class CreaContactoPageModule {}
