import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IuserRegister } from '../../interfaces/register.interface';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../common-styles.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  registerError = {
    showMsg: false,
    message: '',
  };

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      repeatPassword: ['', [Validators.required]],
    });

    this.registerForm.valueChanges.subscribe(
      (_) => (this.registerError.showMsg = false)
    );
  }

  isValidField(name: string) {
    return (
      this.registerForm.controls[name].errors &&
      this.registerForm.controls[name].touched
    );
  }

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    if (
      this.registerForm.controls['password'].value !=
      this.registerForm.controls['repeatPassword'].value
    ) {
      this.registerError.showMsg = true;
      this.registerError.message = 'Passwords dont match';
      return;
    }

    const data: IuserRegister = {
      name: this.registerForm.controls['name'].value,
      username: this.registerForm.controls['username'].value,
      email: this.registerForm.controls['email'].value,
      password: this.registerForm.controls['password'].value,
    };

    this.authService.register(data).subscribe((resp) => {
      if (!resp) {
        this.registerError.showMsg = true;
        this.registerError.message = 'Email already taken';
      }
    });
  }
}
