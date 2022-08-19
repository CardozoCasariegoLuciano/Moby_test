import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth-guard';
import { UserLoguedGuard } from './auth/guards/user-logued.guard';
import { ErrorPageComponent } from './shared/pages/error-page/error-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canLoad: [UserLoguedGuard],
    canActivate: [UserLoguedGuard],
  },
  {
    path: '',
    loadChildren: () => import('./post/post.module').then((m) => m.PostModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: '404',
    component: ErrorPageComponent,
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
