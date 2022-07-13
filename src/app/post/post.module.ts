import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './pages/post-list/post-list.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import {RouterModule} from '@angular/router';
import { CommentsComponent } from './components/comments/comments.component';



@NgModule({
  declarations: [
    PostListComponent,
    PostDetailComponent,
    CommentsComponent,
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
