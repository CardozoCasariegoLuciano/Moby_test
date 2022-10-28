import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EditUser, Geo, User } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Post } from 'src/app/post/interfaces/posts.interface';
import { PostService } from 'src/app/post/services/post.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  editUserForm!: FormGroup;
  areGeoEquals: boolean = true;
  userData!: User;
  isEditing: boolean = false;
  image!: string;
  userPosts: Post[] = [];
  arePostReady: boolean = false;
  getUserSubscriber!: Subscription;
  getUserPostsSubscriber!: Subscription;
  geoEnable: boolean = true;
  isMapModalOpen: boolean = false;
  userLocation!: Geo;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private fb: FormBuilder,
    private profileService: ProfileService
  ) {}

  ngOnDestroy(): void {
    this.getUserSubscriber.unsubscribe();
    this.getUserPostsSubscriber.unsubscribe();
  }

  ngOnInit(): void {
    this.getUserLogued();
    this.initForm();
    this.setImage();
    this.getUserPosts();
    this.setUserLocation();
  }

  private getUserPosts() {
    this.getUserPostsSubscriber = this.postService
      .getPostsByUserID(this.userData.id!)
      .subscribe((posts) => {
        this.userPosts = posts as Post[];
        this.arePostReady = true;
      });
  }

  private setImage() {
    this.image =
      this.userData.photo || '../../../../assets/images/defaultUser.png';
  }

  private getUserLogued() {
    this.getUserSubscriber = this.authService.getUserLogued.subscribe(
      (value) => {
        this.userData = value!;
      }
    );
  }

  private initForm() {
    this.editUserForm = this.fb.group({
      username: ['', [Validators.required]],
      photo: [''],
      lat: [''],
      lng: [''],
    });
    this.setDefaultEditValues();
  }

  edit() {
    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
    this.setDefaultEditValues();
  }

  private setDefaultEditValues() {
    const username = this.editUserForm.get('username')!;
    const photo = this.editUserForm.get('photo')!;
    const lat = this.editUserForm.get('lat')!;
    const lng = this.editUserForm.get('lng')!;

    username.setValue(this.userData!.userName);
    photo.setValue(this.userData!.photo);
    lat.setValue(this.userData!.ubication?.lat);
    lng.setValue(this.userData!.ubication?.lng);
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

    const userID = this.userData.id!;
    const userEmail = this.userData.email;
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

  setUserLocation() {
    this.profileService.getUserLocation().then((val) => {
      this.userLocation = val;
    });
  }

  setGeo() {
    const lat = this.editUserForm.get('lat')!;
    const lng = this.editUserForm.get('lng')!;

    if (this.userLocation) {
      lat.setValue(this.userLocation.lat);
      lng.setValue(this.userLocation.lng);
    } else {
      this.geoEnable = false;
    }
  }

  showMapModal() {
    this.isMapModalOpen = true;
  }

  closeMapModal() {
    this.isMapModalOpen = false;
  }
}
