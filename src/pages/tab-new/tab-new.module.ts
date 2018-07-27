import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabNewPage } from './tab-new';

@NgModule({
  declarations: [
    TabNewPage,
  ],
  imports: [
    IonicPageModule.forChild(TabNewPage),
  ]
})
export class TabNewPageModule {}
