import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Iauth } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from '../../../auth/service/auth.service';

@Component({
  selector: 'app-edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styleUrls: ['./edit-user-form.component.scss'],
})
export class EditUserFormComponent implements OnInit {
  editUserForm!: FormGroup;
  showExtraField: boolean = false;
  areGeoEquals: boolean = true;
  @Input() userData: Iauth | undefined;
  @Output() oncloseModal: EventEmitter<boolean> = new EventEmitter();

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.initForm();
    this.setDefaultValues();
  }

  private initForm() {
    this.editUserForm = this.fb.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: [''],
      newPasswords: [''],
      repeatNewPassword: [''],
      phone: [''],
      webSite: [''],
      street: [''],
      suite: [''],
      city: [''],
      zipcode: [''],
      lat: [''],
      lng: [''],
      companyName: [''],
      catchPhrase: [''],
      bs: [''],
    });
  }

  setDefaultValues() {
    this.editUserForm.get('name')?.reset(this.userData!.name);
    this.editUserForm.get('username')?.reset(this.userData!.username);
    this.editUserForm.get('phone')?.reset(this.userData!.phone);
    this.editUserForm.get('webSite')?.reset(this.userData!.website);
    this.editUserForm.get('street')?.reset(this.userData!.address?.street);
    this.editUserForm.get('suite')?.reset(this.userData!.address?.suite);
    this.editUserForm.get('zipcode')?.reset(this.userData!.address?.zipcode);
    this.editUserForm.get('city')?.reset(this.userData!.address?.city);
    this.editUserForm.get('lat')?.reset(this.userData!.address?.geo?.lat);
    this.editUserForm.get('lng')?.reset(this.userData!.address?.geo?.lng);
    this.editUserForm.get('companyName')?.reset(this.userData!.company?.name);
    this.editUserForm
      .get('catchPhrase')
      ?.reset(this.userData!.company?.catchPhrase);
    this.editUserForm.get('bs')?.reset(this.userData!.company?.bs);
  }

  editData() {
    if (this.editUserForm.invalid) return;
    if (!this.arePasswordsOk()) return;
    if (!this.isGeoOk()) return;

    let data: Iauth = {
      id: this.userData!.id!,
      name: this.editUserForm.get('name')?.value,
      username: this.editUserForm.get('username')?.value,
      phone: this.editUserForm.get('phone')?.value,
      website: this.editUserForm.get('webSite')?.value,
      address: {
        street: this.editUserForm.get('street')?.value,
        suite: this.editUserForm.get('suite')?.value,
        city: this.editUserForm.get('city')?.value,
        zipcode: this.editUserForm.get('zipcode')?.value,
        geo: {
          lat: this.editUserForm.get('lat')?.value,
          lng: this.editUserForm.get('lng')?.value,
        },
      },
      company: {
        name: this.editUserForm.get('companyName')?.value,
        catchPhrase: this.editUserForm.get('catchPhrase')?.value,
        bs: this.editUserForm.get('bs')?.value,
      },
    };

    const password = this.editUserForm.get('newPasswords')?.value;

    if (password) {
      data.password = password;
    }

    this.authService.editUser(data).subscribe();
    this.closeModal();
  }

  isValidField(name: string) {
    return (
      this.editUserForm.controls[name].errors &&
      this.editUserForm.controls[name].touched
    );
  }

  arePasswordsOk() {
    const actualPass = this.userData!.password;
    const pass = this.editUserForm.controls['password'];
    const newPass = this.editUserForm.controls['newPasswords'];
    const repeateNewPass = this.editUserForm.controls['repeatNewPassword'];

    if (
      pass.value === '' &&
      newPass.value === '' &&
      repeateNewPass.value === ''
    ) {
      return true;
    }

    if (actualPass != pass.value) {
      pass.setErrors({ wrongPass: true });
      return false;
    }

    if (newPass.value != repeateNewPass.value) {
      repeateNewPass.setErrors({
        dontMatch: true,
      });
      return false;
    }

    return true;
  }

  isGeoOk() {
    const lat = this.editUserForm.get('lat')?.value;
    const lng = this.editUserForm.get('lng')?.value;

    const onlyLat = lat != "" && lng == "";
    const onlyLng = lng != "" && lat == "";

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

  displayMoreFields() {
    this.showExtraField = !this.showExtraField;
  }

  closeModal() {
    this.editUserForm.reset();
    this.oncloseModal.emit(false);
  }
}
