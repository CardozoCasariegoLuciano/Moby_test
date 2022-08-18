import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/service/auth.service';
import { NewPost } from '../../interfaces/posts.interface';
import { Icoment } from '../../interfaces/user.interface';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {
  @Input() postID?: number;
  @Input() comment?: Icoment;
  @Input() showForm!: boolean;
  @Output() onEmit: EventEmitter<Date> = new EventEmitter();
  @Output() oncloseModal: EventEmitter<boolean> = new EventEmitter();
  commentsForm!: FormGroup;

  isEditing: boolean = false;

  constructor(
    private authService: AuthService,
    private postService: PostService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.comment ? (this.isEditing = true) : (this.isEditing = false);
    this.initForm();
  }

  private initForm() {
    this.commentsForm = this.fb.group({
      name: ["", [Validators.required, Validators.pattern(/[\S]/)]],
      body: ["", [Validators.required, Validators.maxLength(200), Validators.pattern(/[\S]/)]],
    });

    if (this.isEditing) {
      this.resetWithInitialValues();
    }
  }

  isValidField(name: string) {
    return (
      this.commentsForm.controls[name].errors &&
      this.commentsForm.controls[name].touched
    );
  }

  emitir() {
    if (this.commentsForm.invalid) return

    this.isEditing
      ? this.editComment()
      : this.addComment();

    this.closeModal();
  }

  private addComment() {
    const data: NewPost = {
      name: this.commentsForm.controls['name'].value,
      body: this.commentsForm.controls['body'].value,
      email: this.authService.getUserLogued!.email!,
      postId: this.postID!,
    };

    this.postService.addComment(data).subscribe();
    this.onEmit.emit(new Date());
  }

  private editComment() {
    const commentID = this.comment!.id
    const data: NewPost = {
      name: this.commentsForm.controls['name'].value,
      body: this.commentsForm.controls['body'].value,
      email: this.authService.getUserLogued!.email!,
      postId: this.comment!.postId,
    };

    this.postService.editComment(data, commentID).subscribe();
  }

  closeModal() {
    if (this.isEditing) {
      this.resetWithInitialValues();
    } else {
      this.commentsForm.reset();
    }
    this.postService.notifyAboutChange();
    this.oncloseModal.emit(false);
  }

  private resetWithInitialValues() {
    this.commentsForm.controls['name'].reset(this.comment!.name);
    this.commentsForm.controls['body'].reset(this.comment!.body);
  }
}
