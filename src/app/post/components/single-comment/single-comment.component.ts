import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Icoment } from '../../interfaces/user.interface';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-single-comment',
  templateUrl: './single-comment.component.html',
  styleUrls: ['./single-comment.component.scss'],
})
export class SingleCommentComponent {
  @Input() comment!: Icoment;
  @Output() onUpdate: EventEmitter<boolean> = new EventEmitter();
  isUpper: boolean = false;
  displayBasic: boolean = false;

  constructor(
    private authService: AuthService,
    private postService: PostService
  ) {}

  get userLogued() {
    return this.authService.getUserLogued;
  }

  canDo(): boolean {
    const userEmail = this.authService.getUserLogued.email!;
    const authorEmail = this.comment.email;
    return userEmail === authorEmail;
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
      .deleteComment(this.comment.id)
      .subscribe((_) => this.onUpdate.emit(true))
  }
}
