import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Iauth } from '../../../auth/interfaces/auth.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  displayBasic!: boolean;
  items: MenuItem[] = [];
  editUserForm!: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit() {
    this.initMenuItems();
    this.initForm();
  }

  private initForm() {
    this.editUserForm = this.fb.group({
      name: [null, [Validators.required]],
      username: [null, [Validators.required]],
      password: [null],
      newPasswords: [null],
      repeatNewPassword: [null],
    });
  }

  private initMenuItems() {
    this.items = [
      {
        label: 'My acount',
        icon: 'pi pi-fw pi-user',
        style: { 'margin-left': 'auto' },
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-user-edit',
            command: () => {
              this.showDialog();
            },
          },
          {
            label: 'Log out',
            icon: 'pi pi-fw pi-power-off',
            command: () => {
              this.logOut();
            },
          },
        ],
      },
    ];
  }

  get userLogued() {
    return this.authService.getUserLogued;
  }

  showDialog() {
    this.editUserForm.controls["name"].reset(this.userLogued.name)
    this.editUserForm.controls["username"].reset(this.userLogued.username)
    this.displayBasic = true;
  }

  closeModal() {
    this.displayBasic = false;
  }

  logOut() {
    this.authService.logOut();
  }

  editData() {
    if (this.editUserForm.invalid) return
    if (!this.arePasswordsOk()) return

    let data: Iauth = {
      id: this.userLogued.id!
    }

    data = this.addFields(data)

    this.displayBasic = false;
    this.authService.editUser(data).subscribe()
    this.editUserForm.reset()
  }

  isValidField(name: string) {
    return (
      this.editUserForm.controls[name].errors &&
      this.editUserForm.controls[name].touched
    );
  }

  arePasswordsOk() {
    const actualPass = this.userLogued.password
    const pass = this.editUserForm.controls["password"].value
    const newPass = this.editUserForm.controls["newPasswords"].value
    const repeateNewPass = this.editUserForm.controls["repeatNewPassword"].value

    if (pass === null &&
      newPass === null &&
      repeateNewPass === null) {
      return true
    }

    if (actualPass != pass) {
      this.editUserForm.controls["password"].setErrors({wrongPass: true})
      return false
    }

    if (newPass != repeateNewPass) {
      this.editUserForm.controls["repeatNewPassword"].setErrors({dontMatch: true})
      return false
    }

    return true
  }

  addFields(data: Iauth): Iauth {
    const name = this.editUserForm.controls["name"].value
    const username = this.editUserForm.controls["username"].value
    const pass = this.editUserForm.controls["newPasswords"].value

    if (name != null) {
      data.name = name
    }
    if (username != null) {
      data.username = username
    }
    if (pass != null) {
      data.password = pass
    }

    return data
  }
}
