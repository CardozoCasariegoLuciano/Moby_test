import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PostModule} from './post/post.module';
import {SharedModule} from './shared/shared.module';

import es from "@angular/common/locales/es";
import { registerLocaleData } from "@angular/common";
import {PrimeNGModule} from './prime-ng/prime-ng.module';
registerLocaleData(es)

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PrimeNGModule,

    PostModule,
    SharedModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
