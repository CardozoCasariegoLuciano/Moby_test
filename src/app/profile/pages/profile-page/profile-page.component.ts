import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditUser, User } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Post } from 'src/app/post/interfaces/posts.interface';
import { PostService } from 'src/app/post/services/post.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  editUserForm!: FormGroup;
  areGeoEquals: boolean = true;
  userData!: User;
  isEditing: boolean = false;
  image!: string;
  userPosts: Post[] = [];
  arePostReady: boolean = false;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getUserLogued();
    this.initForm();
    this.setImage();
    this.getUserPosts();
  }

  private getUserPosts() {
    this.postService.getPostsByUserID(this.userData.id!).subscribe((posts) => {
      this.userPosts = posts as Post[];
      this.arePostReady = true;
    });
  }

  private setImage() {
    this.image =
      this.userData.photo || '../../../../assets/images/defaultUser.png';
  }

  private getUserLogued() {
    this.authService.getUserLogued.subscribe((value) => {
      this.userData = value!;
    });
  }

  private initForm() {
    this.editUserForm = this.fb.group({
      username: [this.userData!.userName, [Validators.required]],
      photo: [this.userData!.photo],
      lat: [this.userData!.ubication?.lat],
      lng: [this.userData!.ubication?.lng],
    });
  }

  edit() {
    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
  }

  editData() {
    if (this.editUserForm.invalid) return;
    if (!this.isGeoOk()) return;

    const data: EditUser = {
      userName: this.editUserForm.get('username')!.value,
      photo: this.editUserForm.get('photo')!.value,
      ubication: {
        lat: this.editUserForm.get('lat')!.value || '',
        lng: this.editUserForm.get('lng')!.value || '',
      },
    };

    const userID = this.userData.id!
    const userEmail = this.userData.email
    this.authService.editUser(data, userID, userEmail);
    this.isEditing = false;
  }

  isValidField(name: string) {
    return (
      this.editUserForm.controls[name].errors &&
      this.editUserForm.controls[name].touched
    );
  }

  isGeoOk() {
    const lat = this.editUserForm.get('lat')?.value;
    const lng = this.editUserForm.get('lng')?.value;

    const onlyLat = lat != '' && lng == '';
    const onlyLng = lng != '' && lat == '';

    if (onlyLng) {
      this.areGeoEquals = false;
      return false;
    }

    if (onlyLat) {
      this.areGeoEquals = false;
      return false;
    }

    this.areGeoEquals = true;
    return true;
  }
}
