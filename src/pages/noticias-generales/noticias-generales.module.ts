import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoticiasGeneralesPage } from './noticias-generales';

@NgModule({
  declarations: [
    NoticiasGeneralesPage,
  ],
  imports: [
    IonicPageModule.forChild(NoticiasGeneralesPage),
  ],
})
export class NoticiasGeneralesPageModule {}
