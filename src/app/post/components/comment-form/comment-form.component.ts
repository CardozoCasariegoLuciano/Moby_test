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
  ) {}

  ngOnInit(): void {
    this.comment ? (this.isEditing = true) : (this.isEditing = false);
    this.initForm();
  }

  private initForm() {
    this.commentsForm = this.fb.group({
      name: ['', [Validators.required]],
      body: ['', [Validators.required, Validators.maxLength(200)]],
    });

    if (this.isEditing) {
      console.log('pasa por aca');
      this.commentsForm.controls['name'].reset(this.comment!.name);
      this.commentsForm.controls['body'].reset(this.comment!.body);
    }
  }

  emitir() {
    const data: NewPost = {
      name: this.commentsForm.controls['name'].value,
      body: this.commentsForm.controls['body'].value,
      email: this.authService.getUserLogued!.email!,
      postId: this.postID!,
    };

    this.postService.addPost(data).subscribe();

    this.onEmit.emit(new Date());
    this.commentsForm.reset();
    this.closeModal();
  }

  closeModal() {
    if (this.isEditing) {
      this.commentsForm.controls['name'].reset(this.comment!.name);
      this.commentsForm.controls['body'].reset(this.comment!.body);
    } else {
      this.commentsForm.reset();
    }
    this.oncloseModal.emit(false);
  }
}
