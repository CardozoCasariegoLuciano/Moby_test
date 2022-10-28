import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { convertMessage } from 'src/app/helpers/authErrorMessajes';
import {
  emailPattern,
} from 'src/app/shared/customValidators/regex';
import { IuserRegister } from '../../interfaces/register.interface';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../common-styles.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  image: string = '../../../../assets/images/defaultUser.png';
  registerError = {
    showMsg: false,
    message: '',
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(emailPattern)]],
      password: ['', [Validators.required]],
      repeatPassword: ['', [Validators.required]],
      photo: [''],
      birthDate: [''],
    });

    this.registerForm.valueChanges.subscribe(
      (_) => (this.registerError.showMsg = false)
    );

    this.registerForm
      .get('photo')
      ?.valueChanges.pipe(debounceTime(300))
      .subscribe((value) => {
        this.image = value;

        if (this.image === '') {
          this.image = '../../../../assets/images/defaultUser.png';
        }
      });
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
      photo: this.registerForm.controls['photo'].value,
      birthDate: this.registerForm.controls['birthDate'].value,
    };

    this.authService
      .fireRegister({ email: data.email, password: data.password })
      .then((_) => {
        this.authService.prepare(data);
      })
      .catch((err) => {
        this.registerError.showMsg = true;
        this.registerError.message = convertMessage(err['code']);
      });
  }
}
