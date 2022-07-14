import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import {RouterModule} from '@angular/router';
import { SpinerComponent } from './components/spiner/spiner.component';



@NgModule({
  declarations: [
    ErrorPageComponent,
    SpinerComponent
  ],
  exports: [
    SpinerComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
