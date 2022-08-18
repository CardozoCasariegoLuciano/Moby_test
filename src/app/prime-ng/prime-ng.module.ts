import { NgModule } from '@angular/core';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {MenubarModule} from 'primeng/menubar';
import {DialogModule} from 'primeng/dialog';
import {InputTextareaModule} from 'primeng/inputtextarea';

@NgModule({
  exports: [
    InputTextModule,
    ButtonModule,
    MenubarModule,
    DialogModule,
    InputTextareaModule,
  ]
})
export class PrimeNGModule { }
