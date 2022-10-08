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
  }

  private initForm() {
    this.editUserForm = this.fb.group({
      name: [this.userData!.name, [Validators.required]],
      username: [this.userData!.username, [Validators.required]],
      password: [''],
      newPasswords: [''],
      repeatNewPassword: [''],
      phone: [this.userData!.phone],
      webSite: [this.userData!.website],
      street: [this.userData!.address?.street],
      suite: [this.userData!.address?.suite],
      city: [this.userData!.address?.city],
      zipcode: [this.userData!.address?.zipcode],
      lat: [this.userData!.address?.geo?.lat],
      lng: [this.userData!.address?.geo?.lng],
      companyName: [this.userData!.company?.name],
      catchPhrase: [this.userData!.company?.catchPhrase],
      bs: [this.userData!.company?.bs],
    });
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

    this.authService.editUser(data);
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

  displayMoreFields() {
    this.showExtraField = !this.showExtraField;
  }

  closeModal() {
    this.editUserForm.reset();
    this.oncloseModal.emit(false);
  }
}
