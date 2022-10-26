import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/auth/interfaces/auth.interface';
import { Post } from '../../interfaces/posts.interface';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-new-post-form',
  templateUrl: './new-post-form.component.html',
  styleUrls: ['./new-post-form.component.scss'],
})
export class NewPostFormComponent implements OnInit {
  isEditing: boolean = false;
  postForm!: FormGroup;
  @Input() post?: Post;
  @Input() showForm!: boolean; 
  @Output() oncloseModal: EventEmitter<boolean> = new EventEmitter();

  constructor(private postService: PostService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.post ? (this.isEditing = true) : (this.isEditing = false);
    this.initForm();
  }

  private initForm() {
    this.postForm = this.fb.group({
      title: ['', [Validators.maxLength(100)]],
      body: ['', [Validators.maxLength(500)]],
    });
    if (this.isEditing) {
      this.resetWithInitialValues();
    }
  }

  isValidField(name: string) {
    return (
      this.postForm.controls[name].errors &&
      this.postForm.controls[name].touched
    );
  }

  closeModal() {
    if (this.isEditing) {
      this.resetWithInitialValues();
    } else {
      this.postForm.reset();
    }
    this.oncloseModal.emit(false);
  }

  emitir() {
    if (this.postForm.invalid) return;

    const storagedUser = localStorage.getItem('userLogued');
    let user!: User;
    if (storagedUser) {
      user = JSON.parse(storagedUser) as User;
    }

    this.isEditing ? this.editPost(user) : this.addPost(user);

    this.closeModal();
    //this.postService.notifyAboutChange();
  }

  private async addPost(user: User) {
    const data: Post = {
      title: this.postForm.controls['title'].value,
      body: this.postForm.controls['body'].value,
      isHide: false,
      commentsDisabled: false,
      author: { id: user.id!, email: user.email, name: user.fullName },
    };

    const resp = await this.postService.addPost(data);
    console.log(resp)
  }

  private editPost(user: User) {
    const postID = this.post!.id;
    const data: Post = {
      title: this.postForm.controls['title'].value,
      body: this.postForm.controls['body'].value,
      isHide: false,
      commentsDisabled: false,
      author: { id: user.id!, email: user.email, name: user.fullName },
    };

    this.postService.editPost(data, postID!);
  }

  private resetWithInitialValues() {
    this.postForm.controls['title'].reset(this.post!.title);
    this.postForm.controls['body'].reset(this.post!.body);
  }
}
