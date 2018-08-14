import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FiltrarCardsPage } from './filtrar-cards';

@NgModule({
  declarations: [
    FiltrarCardsPage,
  ],
  imports: [
    IonicPageModule.forChild(FiltrarCardsPage),
  ],
})
export class FiltrarCardsPageModule {}
