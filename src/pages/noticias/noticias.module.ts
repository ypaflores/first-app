import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoticiasPage } from './noticias';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    NoticiasPage,
  ],
  imports: [
    IonicPageModule.forChild(NoticiasPage),
    TranslateModule.forChild()
  ],
})
export class NoticiasPageModule {}
