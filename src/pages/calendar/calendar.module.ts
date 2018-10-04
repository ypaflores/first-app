import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarPage } from './calendar';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CalendarPage,
  ],
  imports: [
    IonicPageModule.forChild(CalendarPage),TranslateModule.forChild()

  ],
})
export class CalendarPageModule {}
