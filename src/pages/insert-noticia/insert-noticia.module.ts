import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InsertNoticiaPage } from './insert-noticia';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    InsertNoticiaPage,
  ],
  imports: [
    IonicPageModule.forChild(InsertNoticiaPage),
    TranslateModule.forChild()
  ],
})
export class InsertNoticiaPageModule {}
