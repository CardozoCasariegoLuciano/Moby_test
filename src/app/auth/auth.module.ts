import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRouterModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PrimeNGModule } from '../prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRouterModule,
    ReactiveFormsModule,
    PrimeNGModule
  ],
})
export class AuthModule {}
