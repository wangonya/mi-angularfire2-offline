import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalcPage } from './calc';

@NgModule({
  declarations: [
    CalcPage,
  ],
  imports: [
    IonicPageModule.forChild(CalcPage),
  ],
  exports: [
    CalcPage
  ]
})
export class CalcPageModule {}
