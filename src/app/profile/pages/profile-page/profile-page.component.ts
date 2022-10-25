import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/auth/interfaces/auth.interface';
import {AuthService} from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  editUserForm!: FormGroup;
  areGeoEquals: boolean = true;
  userData!: User;
  isEditing: boolean = true;
  image!: string;

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getStorage();
    this.initForm();
    this.setImage();
  }

  private setImage() {
    this.image =
      this.userData.photo || '../../../../assets/images/defaultUser.png';
  }

  private getStorage() {
    const user = localStorage.getItem('userLogued');
    if (user) {
      this.userData = JSON.parse(user) as User;
    }
  }

  private initForm() {
    this.editUserForm = this.fb.group({
      username: [this.userData!.userName, [Validators.required]],
      photo: [this.userData!.photo, [Validators.required]],
      lat: [this.userData!.ubication.lat, [Validators.required]],
      lng: [this.userData!.ubication.lng, [Validators.required]],
    });
  }

  edit() {
    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
  }

  sendEdit(){
    console.log(this.editUserForm.value)
    this.authService.editUser(this.editUserForm.value)
  }

  //editData() {
  //if (this.editUserForm.invalid) return;
  //if (!this.arePasswordsOk()) return;
  //if (!this.isGeoOk()) return;

  //let data: Iauth = {
  //id: this.userData!.id!,
  //name: this.editUserForm.get('name')?.value,
  //username: this.editUserForm.get('username')?.value,
  //phone: this.editUserForm.get('phone')?.value,
  //website: this.editUserForm.get('webSite')?.value,
  //address: {
  //street: this.editUserForm.get('street')?.value,
  //suite: this.editUserForm.get('suite')?.value,
  //city: this.editUserForm.get('city')?.value,
  //zipcode: this.editUserForm.get('zipcode')?.value,
  //geo: {
  //lat: this.editUserForm.get('lat')?.value,
  //lng: this.editUserForm.get('lng')?.value,
  //},
  //},
  //company: {
  //name: this.editUserForm.get('companyName')?.value,
  //catchPhrase: this.editUserForm.get('catchPhrase')?.value,
  //bs: this.editUserForm.get('bs')?.value,
  //},
  //};

  //const password = this.editUserForm.get('newPasswords')?.value;

  //if (password) {
  //data.password = password;
  //}

  //this.authService.editUser(data);
  //this.closeModal();
  //}

  isValidField(name: string) {
    return (
      this.editUserForm.controls[name].errors &&
      this.editUserForm.controls[name].touched
    );
  }

  //arePasswordsOk() {
  //const actualPass = this.userData!.password;
  //const pass = this.editUserForm.controls['password'];
  //const newPass = this.editUserForm.controls['newPasswords'];
  //const repeateNewPass = this.editUserForm.controls['repeatNewPassword'];

  //if (
  //pass.value === '' &&
  //newPass.value === '' &&
  //repeateNewPass.value === ''
  //) {
  //return true;
  //}

  //if (actualPass != pass.value) {
  //pass.setErrors({ wrongPass: true });
  //return false;
  //}

  //if (newPass.value != repeateNewPass.value) {
  //repeateNewPass.setErrors({
  //dontMatch: true,
  //});
  //return false;
  //}

  //return true;
  //}

  //isGeoOk() {
  //const lat = this.editUserForm.get('lat')?.value;
  //const lng = this.editUserForm.get('lng')?.value;

  //const onlyLat = lat != '' && lng == '';
  //const onlyLng = lng != '' && lat == '';

  //if (onlyLng) {
  //this.areGeoEquals = false;
  //return false;
  //}

  //if (onlyLat) {
  //this.areGeoEquals = false;
  //return false;
  //}

  //this.areGeoEquals = true;
  //return true;
  //}

  //displayMoreFields() {
  //this.showExtraField = !this.showExtraField;
  //}

  //closeModal() {
  //this.editUserForm.reset();
  //this.oncloseModal.emit(false);
  //}
}
