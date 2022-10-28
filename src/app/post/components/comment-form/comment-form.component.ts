import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Comment, EditCommentData } from '../../interfaces/comment.interface';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {
  @Input() postID?: string;
  @Input() comment?: Comment;
  @Input() showForm!: boolean;
  @Output() oncloseModal: EventEmitter<boolean> = new EventEmitter();
  commentsForm!: FormGroup;
  user!: User;

  isEditing: boolean = false;

  constructor(
    private authService: AuthService,
    private postService: PostService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.authService.getUserLogued.subscribe((user) => {
      this.user = user!;
    });

    this.comment ? (this.isEditing = true) : (this.isEditing = false);
    this.initForm();
  }

  private initForm() {
    this.commentsForm = this.fb.group({
      title: ['', [Validators.required, Validators.pattern(/[\S]/)]],
      body: [
        '',
        [
          Validators.required,
          Validators.maxLength(200),
          Validators.pattern(/[\S]/),
        ],
      ],
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
    if (this.commentsForm.invalid) return;
    this.isEditing ? this.editComment() : this.addComment();
    this.closeModal();
  }

  private addComment() {
    const data: Comment = {
      title: this.commentsForm.controls['title'].value,
      body: this.commentsForm.controls['body'].value,
      postId: this.postID!,
      isHide: false,
      likes: [],
      created: new Date(),
      author: {
        id: this.user.id!,
        photo: this.user.photo,
        userName: this.user.userName,
      },
    };

    this.postService.addComment(data);
  }

  private editComment() {
    const commentID = this.comment!.id;
    const data: EditCommentData = {
      title: this.commentsForm.controls['name'].value,
      body: this.commentsForm.controls['body'].value,
    };

    this.postService.editComment(data, commentID!);
  }

  closeModal() {
    if (this.isEditing) {
      this.resetWithInitialValues();
    } else {
      this.commentsForm.reset();
    }
    this.oncloseModal.emit(false);
  }

  private resetWithInitialValues() {
    this.commentsForm.controls['title'].reset(this.comment!.title);
    this.commentsForm.controls['body'].reset(this.comment!.body);
  }
}
