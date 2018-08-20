import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { TranslateHttpLoader } from '../../../node_modules/@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '../../../node_modules/@ngx-translate/core';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
})
export class LoginPageModule {}
