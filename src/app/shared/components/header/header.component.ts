import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  displayBasic!: boolean;
  items: MenuItem[] = [];
  editUserForm!: FormGroup;
  
  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit() {
    this.initMenuItems();
    this.initForm();

    console.log("init: ",this.userLogued)
  }

  private initForm() {
    this.editUserForm = this.fb.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: [''],
      newPasswords: [''],
      repeatNewPassword: [''],
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
            command: (event: Event) => {
              this.showDialog();
            },
          },
          {
            label: 'Log out',
            icon: 'pi pi-fw pi-power-off',
            command: (event: Event) => {
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
    this.displayBasic = true;
  }

  logOut() {
    this.authService.logOut();
  }

  editData() {
    this.displayBasic = false;
    console.log(this.editUserForm.value)
  }

  isValidField(name: string) {
    return (
      this.editUserForm.controls[name].errors &&
      this.editUserForm.controls[name].touched
    );
  }
}
