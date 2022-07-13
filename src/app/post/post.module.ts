import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './pages/post-list/post-list.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [
    PostListComponent,
    PostDetailComponent,
  ],
  exports: [
    PostListComponent,
    PostDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class PostModule { }
