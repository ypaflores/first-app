import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InsertNoticiaPage } from './insert-noticia';

@NgModule({
  declarations: [
    InsertNoticiaPage,
  ],
  imports: [
    IonicPageModule.forChild(InsertNoticiaPage),
  ],
})
export class InsertNoticiaPageModule {}
