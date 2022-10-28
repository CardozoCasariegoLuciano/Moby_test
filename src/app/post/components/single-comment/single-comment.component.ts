import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {User} from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Comment } from '../../interfaces/comment.interface';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-single-comment',
  templateUrl: './single-comment.component.html',
  styleUrls: ['./single-comment.component.scss'],
})
export class SingleCommentComponent implements OnInit {
  @Input() comment!: Comment;
  @Output() onUpdate: EventEmitter<boolean> = new EventEmitter();
  isUpper: boolean = false;
  displayBasic: boolean = false;
  user!: User;

  constructor(
    private authService: AuthService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.getUserLoged();
  }

  private getUserLoged() {
    this.authService.getUserLogued.subscribe((user) => {
      this.user = user!;
    });
  }

  get userLogued() {
    return this.authService.getUserLogued;
  }

  canDo(): boolean {
    const userID = this.user.id;
    const authorID = this.comment.author.id;
    return userID === authorID;
  }

  changeCase() {
    this.isUpper = !this.isUpper;
  }

  showDialog() {
    this.displayBasic = true;
  }

  sendEmmitd() {
    this.onUpdate.emit(true);
  }

  closeModal(_: boolean) {
    this.displayBasic = false;
  }

  deleteComment() {
    this.postService
      .deleteComment(this.comment.id!)
      .subscribe((_) => this.onUpdate.emit(true));
  }
}
