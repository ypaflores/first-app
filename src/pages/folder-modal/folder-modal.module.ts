import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FolderModalPage } from './folder-modal';
import { MbscModule } from '@mobiscroll/angular';

@NgModule({
  declarations: [
    FolderModalPage,
  ],
  imports: [
    MbscModule,
    IonicPageModule.forChild(FolderModalPage),
  ],
})
export class FolderModalPageModule {}
