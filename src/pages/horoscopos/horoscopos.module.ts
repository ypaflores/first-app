import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HoroscoposPage } from './horoscopos';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    HoroscoposPage,
  ],
  imports: [
    IonicPageModule.forChild(HoroscoposPage),
    TranslateModule.forChild()
  ],
})
export class HoroscoposPageModule {}


