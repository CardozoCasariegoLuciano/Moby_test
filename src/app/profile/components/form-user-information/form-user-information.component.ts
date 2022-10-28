import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditUser, Geo, User } from 'src/app/auth/interfaces/user.interface';
import { AuthService } from 'src/app/auth/service/auth.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-form-user-information',
  templateUrl: './form-user-information.component.html',
  styleUrls: ['./form-user-information.component.scss'],
})
export class FormUserInformationComponent implements OnInit {
  @Input() userData!: User;
  @Output() isEditting: EventEmitter<boolean> = new EventEmitter();

  editUserForm!: FormGroup;
  areGeoEquals: boolean = true;
  geoAreNotNumber: boolean = true;
  geoEnable: boolean = true;
  userLocation!: Geo;
  image!: string;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.setImage();
    this.setUserLocation();
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

  private setImage() {
    this.image =
      this.userData.photo || '../../../../assets/images/defaultUser.png';
  }

  private setUserLocation() {
    this.profileService.getUserLocation().then((val) => {
      this.userLocation = val;
    });
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
    this.isEditting.emit(false);
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
    const re = new RegExp('^-?[0-9.]+$');

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

    const validLatType = re.test(lat);
    const validLngType = re.test(lng);

    if (!validLngType || !validLatType) {
      this.geoAreNotNumber = false;
      return false;
    }

    this.geoAreNotNumber = true;
    this.areGeoEquals = true;
    return true;
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

  cancelEdit() {
    this.setDefaultEditValues();
    this.isEditting.emit(false);
  }
}
