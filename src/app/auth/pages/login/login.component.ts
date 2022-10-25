import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { convertMessage } from 'src/app/helpers/authErrorMessajes';
import { emailPattern } from 'src/app/shared/customValidators/regex';
import { FireAuth } from '../../interfaces/register.interface';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../common-styles.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginError = {
    showMsg: false,
    message: '',
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(emailPattern)]],
      password: ['', [Validators.required]],
    });

    this.loginForm.valueChanges.subscribe(
      (_) => (this.loginError.showMsg = false)
    );
  }

  isValidField(name: string) {
    return (
      this.loginForm.controls[name].errors &&
      this.loginForm.controls[name].touched
    );
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const data: FireAuth = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value,
    };

    this.authService
      .fireLogIn(data)
      .then((resp) => {
        this.authService.setStorage(resp.user.uid);
      })
      .catch((err) => {
        this.loginError.showMsg = true;
        this.loginError.message = convertMessage(err['code']);
      });
  }
}
