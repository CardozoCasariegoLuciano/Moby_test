import { NgModule } from '@angular/core';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {MenubarModule} from 'primeng/menubar';
import {DialogModule} from 'primeng/dialog';

@NgModule({
  exports: [
    InputTextModule,
    ButtonModule,
    MenubarModule,
    DialogModule,
  ]
})
export class PrimeNGModule { }
