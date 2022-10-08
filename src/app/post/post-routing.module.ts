import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { PostListComponent } from './pages/post-list/post-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PostListComponent,
        pathMatch: 'full',
      },
      {
        path: ':id',
        component: PostDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRouterModule {}
