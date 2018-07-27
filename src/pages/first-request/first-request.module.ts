import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FirstRequestPage } from './first-request';

@NgModule({
  declarations: [
    FirstRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(FirstRequestPage),
  ],
})
export class FirstRequestPageModule {}
