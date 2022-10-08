import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { emailPattern } from 'src/app/shared/customValidators/regex';
import { IuserLogin } from '../../interfaces/login.interface';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../common-styles.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginRequest!: Subscription
  loginError = {
    showMsg: false,
    message: '',
  };

  constructor(private fb: FormBuilder, private authService: AuthService) {}

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

    const data: IuserLogin = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value,
    };

    this.loginRequest && this.loginRequest.unsubscribe();
    this.loginRequest = this.authService.login(data).subscribe((resp) => {
      if (!resp) {
        this.loginError.showMsg = true;
        this.loginError.message = 'Wrong email or password';
      }
    });
  }
}
