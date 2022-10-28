import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { User } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Comment, EditCommentData } from '../../interfaces/comment.interface';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-single-comment',
  templateUrl: './single-comment.component.html',
  styleUrls: ['./single-comment.component.scss'],
})
export class SingleCommentComponent implements OnInit, OnDestroy {
  @Input() comment!: Comment;
  @Output() onUpdate: EventEmitter<boolean> = new EventEmitter();
  isUpper: boolean = false;
  displayBasic: boolean = false;
  user!: User;
  image!: string;
  getUserSubs!: Subscription;
  isLiked!: boolean;
  showLikes: boolean = false;

  constructor(
    private authService: AuthService,
    private postService: PostService
  ) {}

  ngOnDestroy(): void {
    this.getUserSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.getUserLoged();
    this.image =
      this.comment.author.photo || '../../../../assets/images/defaultUser.png';

    this.setLiked();
  }

  private getUserLoged() {
    this.getUserSubs = this.authService.getUserLogued
      .pipe(take(1))
      .subscribe((user) => {
        this.user = user!;
      });
  }

  canDo(): boolean {
    if (!this.user) return false;
    const userID = this.user.id;
    const authorID = this.comment.author.id;
    return userID === authorID;
  }

  hideComment() {
    const data: EditCommentData = {
      isHide: !this.comment.isHide,
    };
    this.postService.editComment(this.comment.id!, data);
  }

  isAdmin(): boolean {
    if (!this.user) return false;
    return this.user.role === 'ADMIN';
  }

  showDialog() {
    this.displayBasic = true;
  }

  showLikesModal() {
    this.showLikes = true;
  }

  sendEmmitd() {
    this.onUpdate.emit(true);
  }

  closeModal(_: boolean) {
    this.displayBasic = false;
  }

  closeLikeModal() {
    this.showLikes = false;
  }

  deleteComment() {
    this.postService.deleteComment(this.comment.id!);
  }

  toggleLike() {
    this.postService.toogleLike(this.comment, this.user);
  }

  setLiked() {
    this.isLiked =
      this.comment.likes.filter((e) => {
        return e.id === this.user?.id;
      }).length > 0;
  }
}
