import { FormsModule } from '@angular/forms';
import { MbscModule } from '@mobiscroll/angular';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactosPage } from './contactos';
import { NgxCarousel3dModule } from 'ngx-carousel-3d';
import { CreaContactoPage } from '../crea-contacto/crea-contacto';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ContactosPage,
  ],
  imports: [ 
    FormsModule, 
    MbscModule,
    IonicPageModule.forChild(ContactosPage),
    NgxCarousel3dModule,CreaContactoPage,TranslateModule.forChild()
  ],
})
export class ContactosPageModule {}
