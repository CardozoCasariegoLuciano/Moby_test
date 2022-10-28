import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { RouterModule } from '@angular/router';
import { CommentsComponent } from './components/comments/comments.component';
import { SingleCommentComponent } from './components/single-comment/single-comment.component';
import { SharedModule } from '../shared/shared.module';
import { PostRouterModule } from './post-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { NewPostFormComponent } from './components/new-post-form/new-post-form.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { HomeComponent } from './pages/home/home.component';
import { LikesListComponent } from './components/likes-list/likes-list.component';

@NgModule({
  declarations: [
    PostListComponent,
    PostDetailComponent,
    CommentsComponent,
    SingleCommentComponent,
    CommentFormComponent,
    NewPostFormComponent,
    HomeComponent,
    LikesListComponent,
  ],
  exports: [PostListComponent, PostDetailComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    PostRouterModule,
    ReactiveFormsModule,
  ],
})
export class PostModule {}
