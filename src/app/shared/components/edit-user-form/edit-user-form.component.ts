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
      name: [null, [Validators.required]],
      username: [null, [Validators.required]],
      password: [null],
      newPasswords: [null],
      repeatNewPassword: [null],
      phone: [null],
      webSite: [null],
      address: this.fb.group({
        street: [null],
        suite: [null],
        city: [null],
        zipcode: [null],
        geo: this.fb.group({
          lat: [null],
          lng: [null],
        }),
      }),
      company: this.fb.group({
        name: [null],
        catchPhrase: [null],
        bs: [null],
      }),
    });
  }

  setDefaultValues() {
    this.editUserForm.controls['name'].reset(this.userData!.name);
    this.editUserForm.controls['username'].reset(this.userData!.username);
    this.editUserForm.get('phone')?.reset(this.userData!.phone);
    this.editUserForm.get('webSite')?.reset(this.userData!.website);

    this.editUserForm
      .get('address.street')
      ?.reset(this.userData!.address?.street);

    this.editUserForm
      .get('address.suite')
      ?.reset(this.userData!.address?.suite);

    this.editUserForm
      .get('address.zipcode')
      ?.reset(this.userData!.address?.zipcode);

    this.editUserForm.get('address.city')?.reset(this.userData!.address?.city);

    this.editUserForm
      .get('address.geo.lat')
      ?.reset(this.userData!.address?.geo?.lat);

    this.editUserForm
      .get('address.geo.lng')
      ?.reset(this.userData!.address?.geo?.lng);

    this.editUserForm.get('company.name')?.reset(this.userData!.company?.name);

    this.editUserForm
      .get('company.catchPhrase')
      ?.reset(this.userData!.company?.catchPhrase);

    this.editUserForm.get('company.bs')?.reset(this.userData!.company?.bs);
  }

  editData() {    
    if (this.editUserForm.invalid) return;
    if (!this.arePasswordsOk()) return;
    if (!this.isGeoOk()) return;

    let data: Iauth = {
      id: this.userData!.id!,
      name: this.editUserForm.get('name')?.value,
      username: this.editUserForm.get('username')?.value,
    };

    data = this.addFields(data);

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

    if (pass.value === '') {
      pass.setValue(null);
      return true;
    }

    if (
      pass.value === null &&
      newPass.value === null &&
      repeateNewPass.value === null
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
    const lat = this.editUserForm.get('address.geo.lat')?.value;
    const lng = this.editUserForm.get('address.geo.lng')?.value;

    const onlyLat = lat != null && lng == null;
    const onlyLng = lng != null && lat == null;

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

  addFields(data: Iauth): Iauth {
    const pass = this.editUserForm.controls['newPasswords'].value;
    const phone = this.editUserForm.controls['phone'].value;
    const webSite = this.editUserForm.controls['webSite'].value;

    const street = this.editUserForm.get('address.street')?.value;
    const suite = this.editUserForm.get('address.suite')?.value;
    const city = this.editUserForm.get('address.city')?.value;
    const zipcode = this.editUserForm.get('address.zipcode')?.value;

    const lat = this.editUserForm.get('address.geo.lat')?.value;
    const lng = this.editUserForm.get('address.geo.lng')?.value;

    const companyName = this.editUserForm.get('company.name')?.value;
    const catchPhrase = this.editUserForm.get('company.catchPhrase')?.value;
    const bs = this.editUserForm.get('company.bs')?.value;

    if (pass != null) {
      data.password = pass;
    }

    if (phone != null) {
      data.phone = phone;
    }

    if (webSite != null) {
      data.website = webSite;
    }

    if (street != null) {
      if (!data.address) {
        data.address = {};
      }
      data.address.street = street;
    }

    if (suite != null) {
      if (!data.address) {
        data.address = {};
      }
      data.address.suite = suite;
    }

    if (city != null) {
      if (!data.address) {
        data.address = {};
      }
      data.address.city = city;
    }

    if (zipcode != null) {
      if (!data.address) {
        data.address = {};
      }
      data.address.zipcode = zipcode;
    }

    if (lat != null && lng != null) {
      if (!data.address) {
        data.address = {};
      }
      if (!data.address.geo) {
        data.address.geo = {};
      }
      data.address.geo.lat = lat;
      data.address.geo.lng = lng;
    }

    if (companyName != null) {
      if (!data.company) {
        data.company = {};
      }
      data.company.name = companyName;
    }

    if (catchPhrase != null) {
      if (!data.company) {
        data.company = {};
      }
      data.company.catchPhrase = catchPhrase;
    }

    if (bs != null) {
      if (!data.company) {
        data.company = {};
      }
      data.company.bs = bs;
    }
    return data;
  }

  displayMoreFields() {
    this.showExtraField = !this.showExtraField;
  }

  closeModal() {
    this.editUserForm.reset();
    this.oncloseModal.emit(false);
  }
}
