import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactosPage } from './contactos';
import { NgxCarousel3dModule } from 'ngx-carousel-3d';
import { CreaContactoPage } from '../crea-contacto/crea-contacto';

@NgModule({
  declarations: [
    ContactosPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactosPage),
    NgxCarousel3dModule,CreaContactoPage
  ],
})
export class ContactosPageModule {}
