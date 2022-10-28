import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ProfileRouterModule } from './profile-routing.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimeNGModule } from '../shared/prime-ng/prime-ng.module';
import { SharedModule } from '../shared/shared.module';
import {PostModule} from '../post/post.module';
import { MapComponent } from './components/map/map.component';

@NgModule({
  declarations: [ProfilePageComponent, MapComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ProfileRouterModule,
    ReactiveFormsModule,
    PrimeNGModule,
    PostModule,
  ],
})
export class ProfileModule {}
