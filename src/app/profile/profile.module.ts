import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ProfileRouterModule } from './profile-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimeNGModule } from '../shared/prime-ng/prime-ng.module';

@NgModule({
  declarations: [ProfilePageComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ProfileRouterModule,
    ReactiveFormsModule,
    PrimeNGModule,
  ],
})
export class ProfileModule {}
