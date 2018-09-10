import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreaContactoPage } from './crea-contacto';
import { Contacts } from '@ionic-native/contacts';

@NgModule({
  declarations: [
    CreaContactoPage,
  ],
  imports: [
    IonicPageModule.forChild(CreaContactoPage),
  ],
  exports: [
    CreaContactoPage
  ],
  providers:[Contacts]
})
export class CreaContactoPageModule {}
