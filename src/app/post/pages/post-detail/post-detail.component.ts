import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Comment } from '../../interfaces/comment.interface';
import { EditPostData, Post } from '../../interfaces/posts.interface';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit, OnDestroy {
  constructor(
    private activeRoute: ActivatedRoute,
    private postService: PostService,
    private authService: AuthService,
    private router: Router
  ) {}

  post!: Post;
  comments: Comment[] = [];
  conmmentReady: boolean = true;
  showCommentForm: boolean = false;
  showPostForm: boolean = false;
  user!: User;
  activeRouteSubsription!: Subscription;
  getPostSubscription!: Subscription;
  getCommentSubscription!: Subscription;

  ngOnDestroy(): void {
    this.activeRouteSubsription.unsubscribe();
    this.getPostSubscription.unsubscribe();
    this.getCommentSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.initPost();
    this.getUserLoged();
  }

  private getUserLoged() {
    this.authService.getUserLogued.subscribe((user) => {
      this.user = user!;
    });
  }

  private initPost() {
    this.activeRouteSubsription = this.activeRoute.params.subscribe(
      (params) => {
        const id = params['id'];
        this.getPostSubscription = this.postService.getPostByID(id).subscribe({
          next: (data) => {
            this.post = data as Post;
            this.getCommentSubscription = this.postService
              .getPostComments(this.post.id!)
              .subscribe((val) => {
                this.comments = this.sortCommentsBydate(val as Comment[]);
              });
          },
          error: () => this.router.navigate(['404']),
        });
      }
    );
  }

  private sortCommentsBydate(value: Comment[]) {
    const sortVal = value.sort((a, b) => {
      return (a.created as any).toDate() - (b.created as any).toDate();
    });

    return sortVal;
  }

  getLastCommentDate() {
    const lastComment = this.comments[this.comments.length - 1];
    return (lastComment.created! as any).toDate();
  }

  showCommentFormModal() {
    this.showCommentForm = true;
  }

  hideCommentForm() {
    this.showCommentForm = false;
  }

  showPostFormModal() {
    this.showPostForm = true;
  }

  hidePostForm() {
    this.showPostForm = false;
  }

  canDoUserAndAdmin(): boolean {
    if (!this.user) return false;
    const userID = this.user.id;
    const authorID = this.post.author.id;
    return userID === authorID || this.user.role === 'ADMIN';
  }

  canDoJustUser(): boolean {
    if (!this.user) return false;
    const userID = this.user.id;
    const authorID = this.post.author.id;
    return userID === authorID;
  }

  hidePost() {
    const data: EditPostData = {
      isHide: !this.post.isHide,
    };
    this.postService.editPost(this.post.id!, data);
  }

  disabledComments(){
    const data: EditPostData = {
      commentsDisabled: !this.post.commentsDisabled,
    };
    this.postService.editPost(this.post.id!, data);
  }

  deletePost() {
    this.postService.deletePost(this.post.id!);
    this.router.navigate(['/posts']);
  }
}
