import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './pages/post-list/post-list.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import {RouterModule} from '@angular/router';
import { CommentsComponent } from './components/comments/comments.component';
import { UserNamePipe } from './pipes/user-name.pipe';
import { SingleCommentComponent } from './components/single-comment/single-comment.component';
import {SharedModule} from '../shared/shared.module';



@NgModule({
  declarations: [
    PostListComponent,
    PostDetailComponent,
    CommentsComponent,
    UserNamePipe,
    SingleCommentComponent,
  ],
  exports: [
    PostListComponent,
    PostDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ]
})
export class PostModule { }
